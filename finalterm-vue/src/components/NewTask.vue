<template>
    <section class="add-task w-4/5 flex flex-col justify-center m-auto border-4 align-center ">
        
        <div class="my-4">
            <div class="text-center">
                <h1>Add a new Task</h1>
            </div>
            <div class="text-center" v-if="showErrorMessage">
                <p class="error-text text-red-500">{{ errorMessage }}</p>
            </div>
            <div class="flex flex-col">
                <div class="input-field m-2 w-4/5 mx-auto">
                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " type="text" placeholder="Add a Task Title - Listen to Kendrick Lamar" v-model="name">
                </div>
                <div class="input-field m-2 w-4/5 mx-auto">
                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" type="text" placeholder="Add a Task Description" v-model="description">
                </div>
                <button @click="addTask" class="button font-dosis text-lg py-3 px-8 rounded-lg self-center 
            text-center text-white bg-green-500 duration-200 border-lg
            border-transparent hover:border-white hover:bg-green-300 hover:text-gray-700">Add</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   
// funcion sin emit
const taskStore = useTaskStore();
// funcion con emit
const emit = defineEmits(['addTask']);
// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = async () => {
    if(name.value.length === 0 || description.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.
    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    //taskStore.addTask(name.value, description.value);
    emit("addTask", name.value, description.value);
    //restart
    name.value = '';
    description.value = '';
}
};

</script>

<style></style>
  