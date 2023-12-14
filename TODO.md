[Jueves]

### Vista: Admin View

- Modulo Gestionar evaluaciones

* Editar evaluacion (FRONT END)

- Cerrar evaluacion,Change the end date or the evaluation type

* See all the submission of af an evaluation

- Listar todos los envios de una evaluacion
- Calificar los envios y hacer recomendaciones

* Ver el historial de un estduiante

- Cuando fue aprovado su proyecto de tesis y sus evaluaciones (Backend y front end)

### Vista: Student View

- Make submision of an evaluation that has no submittion
- Edit submision if an evauation is open

### Vista: Profesores View (Tarde)

1. **Aprobar Proyecto (si está pendiente)**
   -Solamente mostrar el boton para aprobar un proyecto de tesis si es un professor
   -Create the function in the cusmtom hook to approve the project
   -Show confirm alert to approve a project
   -Show error or succes alert when the project is aproved
   -Show approval info correctly

2. Create new filter to filter by status (Aproved or Not aproved)
3. Indicator to show the total of projects and the number of search results

[VIERNES]

### Vista: Admin View

- Crear una nueva defensa de un proyecto determiando
  [UI Tasks]

* Select the proyect
* Agregar evaluacion
* Agregar recomendaciones
* Subir Documento
* Subir ppt

[Backed task]
1- Take of the request
the eval in base a 5,
the recoms as an string
the doc
the ppt

2- Extract:
the stduent data ,
the tutors data ,
the topic of the proyect,

3- Upload the files and get the url (and endpoint of my backed that will send the document)
4- Create the new Defese wit the data we have
5- Set the project as ancient=true and status=closed
6- Deactivate the related student
7- Send the doc con el acta de defensa

[SABADO]

- Modulo eArchivo

* Main layout and routing
* Buscar estudiantes tanto activos como no activos y poder ver su historial
  .Backend endpoint to get the historial of a student
  .Add the functionality inside a Service

* Buscar y descargar documentos de tesis por cualquier termino de busqueda
  Backend endpoint to get a list of documents for a seach tearm

[DOMINGO]

[Secondary]
-Add serach functionality in students and profesors
-Delete and edit court
-Edit,,delete, and see historial btn in large screen

### Vista: Profesores View (Tarde)

4. Fix routes
5. Dashboard Page
