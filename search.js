import "./elements.js"
import elements from "./elements.js";

class boxbutton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.inputHandler = inputHandler.bind(this);
        this.tasks = [];
        this.shadowRoot.innerHTML = `
     <style>

        .target{
            margin:auto;
            width:200px;
        }

        .wrapper {
            text-align: center;
        }
    
        .button {            
            position: absolute;
            top: 50%;
        }
     </style>
      <div class="target wrapper">
          <input name="textBox" placeholder="enter todos"></input>
          <button>add todo</button>
      </div>
    `;
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector("button");
        this.inputbox = this.shadowRoot.querySelector("input");
        button.addEventListener('click', this.inputHandler);

    }

    disconnectedCallback() {
        const inputbox = this.shadowRoot.querySelector("input");
        inputbox.removeEventListener('click', this.inputHandler);
    }

}

function inputHandler() { // task obj

    const task = {
        id: Date.now(),
        task: this.inputbox.value,
        completed: false
    };
    // push task obj in array
    this.tasks.push(task);
    localStorage.setItem("data", JSON.stringify(this.tasks));
    this.inputbox.value = ""

    // task append to list.
    // const new_task = newFunction.bind(this);
    const new_task = new elements(task);
    const div_elemnt = this.shadowRoot.querySelector("div");
    div_elemnt.appendChild(new_task);

    new_task.addEventListener("checkbox", (e) => {
        const {id, completed} = e.data;
        const task = this.tasks.find(t => t.id == id)
        if (task) {
            task.completed = completed;
        }
    });

    new_task.addEventListener("delete", (delt_task) => {
        const deltID = delt_task.task_delt.id;
        const removeIndex = this.tasks.findIndex(t => t.id == deltID);
        this.tasks.splice(removeIndex, 1);
        localStorage.setItem("data",JSON.stringify(this.tasks));
    });
}

// window.customElements.define("uc-box", boxbutton).addEventListener("load",()=>{
//     console.log("OK")
// })



