<script>

    import {initializeApp, getApps, getApp} from "firebase/app";
    import {getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc} from "firebase/firestore";
    import {firebaseConfig} from "../lib/fireBaseConfig.js";
    import {browser} from "$app/environment";

    const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
    const db = browser && getFirestore();

    const colRef = browser && collection(db, "todos");
    let todos = [];

    const unsubscribe = browser && onSnapshot(colRef, (querySnapshot) => {
        let fbTodos = [];
        querySnapshot.forEach((doc) => {
            let todo = {...doc.data(), id: doc.id};
            fbTodos = [todo, ...fbTodos];
        });
        todos = fbTodos;
    });

    let task = "";
    let error = "";

    const addTodo = async () => {
        if (task !== "") {
            const docRef = await addDoc(collection(db, "todos"), {
                task: task,
                complete: false,
                createdAt: new Date(),
            });
            error = "";
        } else {
            error = "Please enter a task";
        }
        task = "";
    };

    const markTodoComplete = async (item) => {
        await updateDoc(doc(db, "todos", item.id), {
            complete: !item.complete
        });
    }

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
                {todo.task}
            </span>
            <span>
                <button on:click={() => markTodoComplete(todo)}>✅</button>
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