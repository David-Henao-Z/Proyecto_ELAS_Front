// Interfaces para el sistema de tutorías
export interface Tutoria {
  id: number;
  titulo: string;
  descripcion: string;
  materia: string;
  tutor_id: number;
  tutor_nombre?: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  modalidad: 'presencial' | 'virtual';
  ubicacion?: string;
  link_virtual?: string;
  capacidad_maxima: number;
  estudiantes_inscritos: number;
  estado: 'programada' | 'en_curso' | 'finalizada' | 'cancelada';
  precio?: number;
  imagen?: string;
}

export interface InscripcionTutoria {
  id: number;
  tutoria_id: number;
  estudiante_id: number;
  fecha_inscripcion: string;
  estado: 'confirmada' | 'cancelada' | 'completada';
  calificacion?: number;
  comentario?: string;
}

export interface CreateTutoriaData {
  titulo: string;
  descripcion: string;
  materia: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  modalidad: 'presencial' | 'virtual';
  ubicacion?: string;
  link_virtual?: string;
  capacidad_maxima: number;
  precio?: number;
}