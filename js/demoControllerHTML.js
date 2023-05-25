export default function demoHTML(min, max, val) {
  return `
    <form class="[ b-controller ][ c-cluster ]" data-cluster="column-reverse">
      <div class="c-cluster" data-cluster="row">
        <label for="controller">Resize Viewport</label>
        <span>
          <span>${val}</span><span>px</span>
        </span>
      </div>
      <div class="c-cluster" data-cluster="row">
        <span>@min</span>
        <input
          type="range"
          id="controller-input"
          name="controller"
          min="${min}"
          max="${max}"
          value="${val}"
        />
        <span>@max</span>
      </div>
    </form>
  `;
}