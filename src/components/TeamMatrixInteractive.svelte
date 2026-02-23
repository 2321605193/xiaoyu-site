<script>
  import agentsData from '../data/agents.json';

  let selectedAgent = null;
  let filterLevel = 'all';

  const statusMap = {
    online: { color: '#34d399', label: '在线' },
    idle: { color: '#fbbf24', label: '待命' },
    offline: { color: '#5a6478', label: '离线' },
  };

  function selectAgent(agent) {
    selectedAgent = selectedAgent?.id === agent.id ? null : agent;
  }

  function closePanel() {
    selectedAgent = null;
  }

  $: filteredLevels = filterLevel === 'all'
    ? agentsData.levels
    : agentsData.levels.filter((_, i) =>
        filterLevel === 'leader' ? i === 0 :
        filterLevel === 'function' ? i === 1 :
        filterLevel === 'platform' ? i === 2 : true
      );
</script>

<div class="team-interactive">
  <!-- Filter tabs -->
  <div class="filter-tabs">
    {#each [
      { key: 'all', label: '全部' },
      { key: 'leader', label: '总管层' },
      { key: 'function', label: '职能层' },
      { key: 'platform', label: '平台层' },
    ] as tab}
      <button
        class="filter-btn"
        class:active={filterLevel === tab.key}
        on:click={() => filterLevel = tab.key}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- Agent grid -->
  {#each filteredLevels as level, li}
    <div class="level-section">
      <div class="level-header">
        <span class="level-name">{level.name}</span>
        <div class="level-line"></div>
        <span class="level-count">{level.agents.length}</span>
      </div>

      <div class="agent-grid" class:single={li === 0 && filterLevel !== 'leader'}>
        {#each level.agents as agent (agent.id)}
          <button
            class="agent-card"
            class:active={selectedAgent?.id === agent.id}
            class:leader={li === 0}
            on:click={() => selectAgent(agent)}
          >
            <div class="agent-top">
              <span class="agent-emoji">{agent.emoji}</span>
              <div class="agent-info">
                <div class="agent-name-row">
                  <span class="agent-name">{agent.name}</span>
                  <span class="status-indicator" style="background: {statusMap[agent.status].color}; box-shadow: 0 0 6px {statusMap[agent.status].color};"></span>
                </div>
                <span class="agent-role">{agent.role}</span>
              </div>
            </div>
            <div class="agent-tags">
              {#each agent.tags as tag}
                <span class="agent-tag">{tag}</span>
              {/each}
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/each}

  <!-- Detail panel (slide-in) -->
  {#if selectedAgent}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="overlay" on:click={closePanel}></div>
    <div class="detail-panel">
      <button class="close-btn" on:click={closePanel}>✕</button>
      <div class="detail-header">
        <span class="detail-emoji">{selectedAgent.emoji}</span>
        <div>
          <h3 class="detail-name">{selectedAgent.name}</h3>
          <div class="detail-status">
            <span class="status-indicator" style="background: {statusMap[selectedAgent.status].color}; box-shadow: 0 0 6px {statusMap[selectedAgent.status].color};"></span>
            <span>{statusMap[selectedAgent.status].label}</span>
          </div>
        </div>
      </div>
      <p class="detail-role">{selectedAgent.role}</p>
      <div class="detail-section">
        <span class="detail-label">擅长领域</span>
        <div class="detail-tags">
          {#each selectedAgent.tags as tag}
            <span class="detail-tag">{tag}</span>
          {/each}
        </div>
      </div>
      <div class="detail-section">
        <span class="detail-label">Agent ID</span>
        <code class="detail-code">{selectedAgent.id}</code>
      </div>
    </div>
  {/if}
</div>

<style>
  .team-interactive { position: relative; }

  .filter-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 32px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 4px;
    width: fit-content;
  }
  .filter-btn {
    padding: 6px 18px;
    border: none;
    background: transparent;
    color: #5a6478;
    font-size: 0.8rem;
    font-family: var(--font-mono);
    font-weight: 600;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.25s ease;
    letter-spacing: 0.03em;
  }
  .filter-btn:hover { color: #8b95a8; }
  .filter-btn.active {
    background: rgba(34,211,238,0.12);
    color: #22d3ee;
  }

  .level-section { margin-bottom: 32px; }
  .level-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .level-name {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #5a6478;
    white-space: nowrap;
  }
  .level-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }
  .level-count {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #5a6478;
    background: rgba(255,255,255,0.03);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .agent-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }
  .agent-grid.single {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto;
  }

  .agent-card {
    padding: 20px 24px;
    background: #111827;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .agent-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .agent-card:hover {
    background: #1a2332;
    border-color: rgba(34,211,238,0.15);
    transform: translateY(-2px);
  }
  .agent-card:hover::before { opacity: 1; }
  .agent-card.active {
    border-color: rgba(34,211,238,0.3);
    background: #1a2332;
    box-shadow: 0 0 20px rgba(34,211,238,0.08);
  }

  .agent-top { display: flex; gap: 12px; align-items: flex-start; }
  .agent-emoji {
    font-size: 1.4rem;
    transition: transform 0.3s;
  }
  .agent-card:hover .agent-emoji { transform: scale(1.15); }
  .agent-card.leader .agent-emoji { font-size: 2rem; }

  .agent-info { flex: 1; }
  .agent-name-row { display: flex; align-items: center; gap: 8px; }
  .agent-name {
    font-family: var(--font-heading);
    font-weight: 600;
    color: #e8eaf0;
    font-size: 0.95rem;
  }
  .status-indicator {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .agent-role {
    color: #8b95a8;
    font-size: 0.82rem;
    margin-top: 2px;
    line-height: 1.5;
  }

  .agent-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
  }
  .agent-tag {
    font-size: 0.68rem;
    padding: 2px 10px;
    border-radius: 6px;
    background: rgba(34,211,238,0.08);
    color: rgba(34,211,238,0.7);
    font-family: var(--font-mono);
    font-weight: 500;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100;
    backdrop-filter: blur(4px);
  }

  /* Detail panel */
  .detail-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 380px;
    max-width: 90vw;
    height: 100vh;
    background: #111827;
    border-left: 1px solid rgba(255,255,255,0.08);
    z-index: 101;
    padding: 32px;
    overflow-y: auto;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: #8b95a8;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
  }
  .close-btn:hover { background: rgba(255,255,255,0.1); color: #e8eaf0; }

  .detail-header {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .detail-emoji { font-size: 3rem; }
  .detail-name {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: #e8eaf0;
    margin: 0;
  }
  .detail-status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    font-size: 0.8rem;
    color: #8b95a8;
  }
  .detail-role {
    color: #8b95a8;
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .detail-section { margin-bottom: 20px; }
  .detail-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #5a6478;
    margin-bottom: 8px;
  }
  .detail-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .detail-tag {
    padding: 4px 12px;
    background: rgba(34,211,238,0.08);
    border: 1px solid rgba(34,211,238,0.12);
    color: #22d3ee;
    border-radius: 8px;
    font-size: 0.78rem;
    font-family: var(--font-mono);
  }
  .detail-code {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: #22d3ee;
    background: rgba(34,211,238,0.06);
    padding: 4px 12px;
    border-radius: 6px;
  }

  @media (max-width: 640px) {
    .agent-grid { grid-template-columns: 1fr; }
    .detail-panel { width: 100vw; max-width: 100vw; }
    .filter-tabs { width: 100%; }
    .filter-btn { flex: 1; text-align: center; padding: 6px 8px; font-size: 0.75rem; }
  }
</style>
