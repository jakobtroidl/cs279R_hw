<script>

    // some js code that is required by svelte to make the app interactive

    // import all firestore functions
    import {initializeApp, getApps, getApp} from "firebase/app";
    import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc} from "firebase/firestore";
    import {firebaseConfig} from "../lib/fireBaseConfig.js";
    import {browser} from "$app/environment";

    // check if program runs in the browser. If not, do not initialize firebase
    const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
    const db = browser && getFirestore();

    // reference the todos database collection
    const colRef = browser && collection(db, "todos");
    let todos = [];

    // grab all initial data from firestore
    const unsubscribe = browser && onSnapshot(colRef, (querySnapshot) => {
        let fbTodos = [];
        querySnapshot.forEach((doc) => { // query existing documents
            let todo = {...doc.data(), id: doc.id};
            fbTodos = [todo, ...fbTodos];
        });
        todos = fbTodos; // store ecisting data in the to_do variable
    });


    let task = ""; // stores the task name which comes from the text input as a string
    let error = ""; // error message if the task name is empty

    // add a new to_do to the database
    const addTodo = async () => {
        if (task !== "") {
            const docRef = await addDoc(collection(db, "todos"), {
                task: task, // create to_do object
                complete: false,
                createdAt: new Date(),
            });
            error = "";
        } else {
            error = "Please enter a task";
        }
        task = "";
    };

    // toggle the complete status of a to_do, write update to firestore
    const markTodoComplete = async (item) => {
        await updateDoc(doc(db, "todos", item.id), {
            complete: !item.complete
        });
    }

    // delete a to_do from the database and update it in firestore
    const deleteTodo = async (item) => {
        await deleteDoc(doc(db, "todos", item.id));
    }

    $: console.table(todos);
</script>

<input type="text" placeholder="Add to task" bind:value={task}/>
<button on:click={addTodo}>Add</button>

<ol>
    {#each todos as todo}
        <li class:complete={todo.complete}>
            <span>
<!--                list with todo items-->
                {todo.task}
            </span>
            <span>
<!--                button to toggle the to_do completion -->
                <button on:click={() => markTodoComplete(todo)}>✅</button>
                <!--                button to delete a to_do -->
                <button on:click={() => deleteTodo(todo)}>X</button>
            </span>
        </li>
        <!--{:else}-->
        <!--    <p>No todos</p>-->
    {/each}
</ol>

<style>
    .complete {
        text-decoration: line-through;
    }
</style>