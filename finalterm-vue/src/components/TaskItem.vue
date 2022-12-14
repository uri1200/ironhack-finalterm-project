<template>
  <div
     class="container border-none max-w-sm flex flex-col mb-4 p-6 rounded-md shadow-xl bg-opacity-70 h-fit"
     :class="task.is_complete ? 'bg-emerald-100' : 'bg-fuchsia-100'"
  >
    <div class="flex flex-col">
      <div class="icons flex flex-row w-full justify-between">
        <div v-if="!task.is_complete">
          <button
            class="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white rounded-xl"
            @click="completeTask"
          >
            <fa icon="check" />
          </button>
          <!-- <button class="px-4 py-2 bg-red-500 text-white rounded-xl" v-if="!task.is_complete" @click="completeTask"><fa icon="hourglass" /></button> -->
        </div>
        <div>
          <button
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl"
            @click="editTask"
          >
            <fa icon="pen-to-square" />
          </button>
        </div>
        <div>
          <button
            class="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-xl"
            @click="deleteTask"
          >
            <fa icon="trash" />
          </button>
        </div>
      </div>

      <div v-if="editStatus">
        <form class="" @submit.prevent="editedTask">
          <input
            class="font-dosis py-1 px-2 w-full text-xl self-center font-medium my-2 rounded-md text-gray-900 bg-zinc-100"
            v-model="editTitle"
            type="text"
            placeholder="Task new title"
          />
            <textarea class="font-dosis w-full px-2 text-lg self-center rounded-md text-gray-900 bg-zinc-100 italic"
            rows="4" 
            v-model="editDescription"
            type="text"
            placeholder="Task new description">
            </textarea>
          <div class="flex flex-row-reverse">
            <button
                class="font-dosis py-1 px-6 w-1/2 sm:w-1/3 rounded-md text-lg text-slate-50 bg-green-600 opacity-100 duration-200 hover:border-white hover:bg-green-800 hover:text-gray-100 left-12 -bottom-28 sm:left-32 sm:-bottom-20"
                type="submit"
            >
                Edit
            </button>
          </div>
        </form>
      </div>

      <!-- inputs -->
      <div v-if="!editStatus">
        <h2
          class="font-dosis pt-2 text-xl font-medium rounded-md text-gray-900 break-all"
        >
          {{ task.title }}
        </h2>
        <p
          class="font-dosis py-2 text-lg rounded-md text-gray-900 italic whitespace-pre-wrap break-all "
        >
          {{ task.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

//edit variables
let editTitle = ref("");
let editDescription = ref("");
const editStatus = ref("");

//completed status
const completed = ref("");
//define props
const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  //await taskStore.deleteTask(props.task.id);
  emit("deleteTask", props.task.id);
};

const editTask = () => {
  editStatus.value = !editStatus.value;
  editTitle.value = props.task.title;
  editDescription.value = props.task.description;
  completed.value = props.task.is_complete
};

const editedTask = () => {
  let editedTaskValues = {
    id: props.task.id,
    title: editTitle.value,
    description: editDescription.value,
  };
  emit("editTask", editedTaskValues);
  editStatus.value = !editStatus.value;
  if (completed.value) {
    completeTask();
  }
};

const completeTask = () => {
  emit("taskCompleted", props.task);
  completed.value = !completed.value;
};
const emit = defineEmits(["deleteTask", "editTask", "taskCompleted"]);
</script>

<style></style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
