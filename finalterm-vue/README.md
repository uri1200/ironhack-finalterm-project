# [](https://github.com/zantonz/final-project/blob/master/README.md)ToDo App

[Click para acceder a la web](https://todo-zantonz.vercel.app/)

Autor: Anton Zyrianov
Fecha: 25/08/2022

## Descripcion

![Pagina Home](https://i.postimg.cc/m2rV83dV/Captura-de-pantalla-2022-08-25-a-las-10-38-46.png)

Se trata del proyecto final realizado durante el bootcamp de Front End Development en el Ironhack que consiste en una pagina web que te permite gestionar tus tareas.

Es una aplicacion creada con Vue.js que permite a usuarios crear una cuenta, añadir tareas a completar, editarlas, marcarlas como completadas y finalmente borrarlas. Nuestra pagina web esta vinculada a una base de datos, donde estaremos almacenando todos los datos de usuarios y las tareas. En este caso, para gestionarlo utilizaremos Supabase, que nos ofrece un subconjunto de funcionalidades de Back End que nos permite gestionarlo como un servicio.

__El objetivo__ de este proyecto es poner en practica los conocimientos de Vue.js obtenidos durante el curos y ademas poder conectarlo a una base de datos externa y gestionarla.

## Tecnologias empleadas:

* __Client:__ Vue.js y Vite
* __Router:__ Vue Router
* __Store:__ Pinia y Pinia Persist para el Log In
* __Database:__ Supabase

## Seguimiento del proyecto:

Los usuarios podrán crearse una cuenta (Sign Up, Log In y Log Out).
Los usuarios podrán crear tareas, editarlas, marcarlas/desmarcarlas como completadas y borrarlas.
La aplicación estará vinculada a Supabase y guardará ahí toda la data de tareas y usuarios.
Usaremos las stores de Pinia para conectarnos con el backend y manejar el estado de la app.
Usaremos Vue Router para poder navegar por nuestra página evitando hacer refresh.
Crearemos el styling en UN solo archivo (lo tenéis creado en assets/style.css). Si este está correctamente insertado en main.js, no tendréis problema accediendo a las clases y los ids de vuestros componentes.
El diseño de la página será propio.
La página será responsive y tendrá al menos dos versiones: mobile y desktop.
Las operaciones asíncronas estarán correctamente manejadas con promises o async/await.
