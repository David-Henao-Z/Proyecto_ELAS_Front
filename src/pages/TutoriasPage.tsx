import React, { useState } from 'react';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  description: string;
}

interface Materia {
  id: string;
  name: string;
  color: string;
  icon: string;
  videos: Video[];
}

const TutoriasPage: React.FC = () => {
  const [selectedMateria, setSelectedMateria] = useState<string | null>(null);

  // Datos de ejemplo de materias y videos
  const materias: Materia[] = [
    {
      id: 'ciencias-naturales',
      name: 'Ciencias Naturales',
      color: 'bg-green-500',
      icon: '🌿',
      videos: [
        {
          id: '1',
          title: 'Introducción a la Biología Celular',
          youtubeId: 'dQw4w9WgXcQ', // ID de ejemplo
          duration: '15:30',
          description: 'Conceptos básicos sobre células y sus componentes'
        },
        {
          id: '2',
          title: 'Sistema Digestivo Humano',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '22:45',
          description: 'Anatomía y fisiología del sistema digestivo'
        },
        {
          id: '3',
          title: 'Fotosíntesis en las Plantas',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '18:20',
          description: 'Proceso de fotosíntesis y su importancia'
        },
        {
          id: '4',
          title: 'Ecosistemas y Biodiversidad',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '25:10',
          description: 'Tipos de ecosistemas y conservación'
        }
      ]
    },
    {
      id: 'matematicas',
      name: 'Matemáticas',
      color: 'bg-blue-500',
      icon: '📐',
      videos: [
        {
          id: '5',
          title: 'Álgebra Básica - Ecuaciones Lineales',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '20:15',
          description: 'Resolución de ecuaciones de primer grado'
        },
        {
          id: '6',
          title: 'Geometría - Áreas y Perímetros',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '16:40',
          description: 'Cálculo de áreas y perímetros de figuras'
        },
        {
          id: '7',
          title: 'Trigonometría Básica',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '28:30',
          description: 'Funciones trigonométricas fundamentales'
        }
      ]
    },
    {
      id: 'ciencias-sociales',
      name: 'Ciencias Sociales',
      color: 'bg-purple-500',
      icon: '🌍',
      videos: [
        {
          id: '8',
          title: 'Historia de México - Independencia',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '30:20',
          description: 'Proceso de independencia mexicana'
        },
        {
          id: '9',
          title: 'Geografía Mundial - Continentes',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '24:15',
          description: 'Características de los continentes'
        }
      ]
    },
    {
      id: 'artistica',
      name: 'Artística',
      color: 'bg-pink-500',
      icon: '🎨',
      videos: [
        {
          id: '10',
          title: 'Técnicas de Dibujo a Lápiz',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '35:45',
          description: 'Aprende técnicas básicas de sombreado'
        },
        {
          id: '11',
          title: 'Historia del Arte - Renacimiento',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '42:10',
          description: 'Grandes maestros del Renacimiento'
        }
      ]
    },
    {
      id: 'etica-valores',
      name: 'Ética y Valores',
      color: 'bg-yellow-500',
      icon: '⚖️',
      videos: [
        {
          id: '12',
          title: 'Principios Éticos Fundamentales',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '26:30',
          description: 'Bases de la ética y moral'
        }
      ]
    },
    {
      id: 'humanidades',
      name: 'Humanidades',
      color: 'bg-indigo-500',
      icon: '📚',
      videos: [
        {
          id: '13',
          title: 'Literatura Clásica Mexicana',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '38:20',
          description: 'Autores y obras fundamentales'
        }
      ]
    },
    {
      id: 'deportes',
      name: 'Deportes',
      color: 'bg-red-500',
      icon: '⚽',
      videos: [
        {
          id: '14',
          title: 'Rutinas de Ejercicio en Casa',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '45:00',
          description: 'Ejercicios sin equipamiento especial'
        }
      ]
    },
    {
      id: 'religion',
      name: 'Religión',
      color: 'bg-gray-500',
      icon: '🕊️',
      videos: [
        {
          id: '15',
          title: 'Historia de las Religiones',
          youtubeId: 'dQw4w9WgXcQ',
          duration: '32:15',
          description: 'Principales religiones del mundo'
        }
      ]
    }
  ];

  const openYouTubeVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  const selectedMateriaData = materias.find(m => m.id === selectedMateria);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedMateria ? (
          // Vista de selección de materias
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-caprasimo text-elas-navy mb-4">
                Tutorías por Materia
              </h1>
              <p className="text-lg font-questrial text-gray-600">
                Selecciona una materia para ver los videos disponibles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {materias.map((materia) => (
                <button
                  key={materia.id}
                  onClick={() => setSelectedMateria(materia.id)}
                  className={`${materia.color} hover:opacity-90 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                >
                  <div className="text-4xl mb-3">{materia.icon}</div>
                  <h3 className="text-lg font-questrial font-semibold text-center">
                    {materia.name}
                  </h3>
                  <p className="text-sm opacity-90 mt-2">
                    {materia.videos.length} video{materia.videos.length !== 1 ? 's' : ''} disponible{materia.videos.length !== 1 ? 's' : ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Vista de videos de la materia seleccionada
          <div>
            <div className="flex items-center mb-8">
              <button
                onClick={() => setSelectedMateria(null)}
                className="mr-4 p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-caprasimo text-elas-navy">
                  {selectedMateriaData?.icon} {selectedMateriaData?.name}
                </h1>
                <p className="text-lg font-questrial text-gray-600">
                  {selectedMateriaData?.videos.length} videos disponibles
                </p>
              </div>
            </div>

            {/* Grid de videos con scroll */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
              {selectedMateriaData?.videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Thumbnail del video */}
                  <div className="relative aspect-video bg-gray-200">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                      }}
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => openYouTubeVideo(video.youtubeId)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-200"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-questrial">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video info */}
                  <div className="p-4">
                    <h3
                      onClick={() => openYouTubeVideo(video.youtubeId)}
                      className="font-caprasimo text-lg text-elas-navy mb-2 cursor-pointer hover:text-elas-blue transition-colors line-clamp-2"
                    >
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-questrial line-clamp-3">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutoriasPage;