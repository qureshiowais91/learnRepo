export default class elements extends HTMLElement {

    constructor(task) {
        super();
        this.attachShadow({mode: "open"});
        this.task = task;
        this.shadowRoot.innerHTML = `
         <style>
           p{
             display:inline;
           }      
           div{
             margin:20px;
           }
        </style>

      <div class="elements">

      <input type="checkbox" id="${
            this.task.id
        }">
        <p class="input">${
            this.task.task
        }</p>
        <button>Remove</button>
      </div>
      `;
    }

    connectedCallback() {
        const element = this.shadowRoot.querySelector("button");
        const checkbox = this.shadowRoot.getElementById(String(this.task.id));

        element.addEventListener("click", deleted.bind(this));
        checkbox.addEventListener("change", checkEvent.bind(this));
    }

}

function checkEvent(e) { // create event dispactch
    const evt = new Event("checkbox");
    this.task.completed = e.currentTarget.checked;

    if (this.task.completed) { // change style of related P tag
        const task_completed = this.shadowRoot.querySelector("p");
        task_completed.style.textDecoration = "line-through";
        console.log(task_completed);
    } else { // change style of related P tag
        const task_completed = this.shadowRoot.querySelector("p");
        task_completed.style.textDecoration = "none";
        console.log(task_completed);

    } evt.data = {
        ...this.task
    };
    this.dispatchEvent(evt);
}

function deleted() {
    const delt = new Event("delete");
    delt.task_delt = {
        ...this.task
    };
    this.dispatchEvent(delt);
    this.remove();
}

customElements.define("uc-element", elements);
