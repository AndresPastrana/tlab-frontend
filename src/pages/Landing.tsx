import React from "react";

const features = [
  {
    title: "Gestión de Estudiantes y Profesores",
    description:
      "Organiza fácilmente la información de estudiantes y profesores involucrados en proyectos de tesis.",
  },
  {
    title: "Gestión de Tribunales de Tesis",
    description:
      "Facilita la creación y administración de tribunales de tesis, optimizando el proceso de evaluación.",
  },
  {
    title: "Gestión de Proyectos de Tesis",
    description:
      "Centraliza la información y el progreso de los proyectos de tesis, proporcionando una visión clara del estado actual.",
  },
  {
    title: "Colaboración Entre Estudiantes y Profesores",
    description:
      "Fomenta la colaboración efectiva al permitir una comunicación fluida y compartición de recursos.",
  },
  // Agrega más características según sea necesario
];

const FeatureSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
          Características Clave de Tesis Lab
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Datos de las Características

const Header: React.FC = () => {
  return (
    <header className="bg-green-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">¡Bienvenido a Tesis Lab!</h1>
          <p className="text-sm">Transformando tu experiencia académica.</p>
        </div>
        <div>
          <button className="bg-white text-green-500 px-4 py-2 rounded-md text-sm hover:bg-gray-200">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

const Landing = () => {
  return (
    <div>
      <Header />
      <FeatureSection />
    </div>
  );
};

export default Landing;
