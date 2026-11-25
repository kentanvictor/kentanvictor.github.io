{% macro render(display_toc) %}
  <div class="toggle sidebar-toggle">
    <span class="toggle-line toggle-line-first"></span>
    <span class="toggle-line toggle-line-middle"></span>
    <span class="toggle-line toggle-line-last"></span>
  </div>

  <aside class="sidebar">
    <div class="sidebar-inner">

      {%- set display_toc = page.toc.enable and display_toc %}
      {%- if display_toc %}
        {%- if bi_has(page.content) %}
          {%- set tocZh = toc(bi_part(page.content, 'zh'), { class: "nav", list_number: page.toc.number, max_depth: page.toc.max_depth }) %}
          {%- set tocEn = toc(bi_part(page.content, 'en'), { class: "nav", list_number: page.toc.number, max_depth: page.toc.max_depth }) %}
          {%- set toc = '<div class="bi-zh">' + tocZh + '</div><div class="bi-en">' + tocEn + '</div>' %}
          {%- set display_toc = (tocZh.length > 1 or tocEn.length > 1) and display_toc %}
        {%- else %}
          {%- set toc = toc(page.content, { class: "nav", list_number: page.toc.number, max_depth: page.toc.max_depth }) %}
          {%- set display_toc = toc.length > 1 and display_toc %}
        {%- endif %}
      {%- endif %}

      <ul class="sidebar-nav motion-element">
        <li class="sidebar-nav-toc">
          {{ bi__('sidebar.toc') }}
        </li>
        <li class="sidebar-nav-overview">
          {{ bi__('sidebar.overview') }}
        </li>
      </ul>

      <!--noindex-->
      <div class="post-toc-wrap sidebar-panel">
        {%- if display_toc %}
          <div class="post-toc motion-element">{{ toc }}</div>
        {%- endif %}
      </div>
      <!--/noindex-->

      <div class="site-overview-wrap sidebar-panel">
        {{ partial('_partials/sidebar/site-overview.swig', {}, {cache: theme.cache.enable}) }}

        {{- next_inject('sidebar') }}
      </div>

      {%- if theme.back2top.enable and theme.back2top.sidebar %}
        <div class="back-to-top motion-element">
          <i class="fa fa-arrow-up"></i>
          <span>0%</span>
        </div>
      {%- endif %}

    </div>
  </aside>
  <div id="sidebar-dimmer"></div>
{% endmacro %}
