// Interfaces para estadísticas y cronograma
export interface Estadistica {
  id: number;
  tipo: 'tutorias_completadas' | 'estudiantes_activos' | 'tutores_disponibles' | 'materias_populares';
  valor: number;
  fecha: string;
  descripcion?: string;
}

export interface CronogramaItem {
  id: number;
  titulo: string;
  descripcion?: string;
  fecha: string;
  hora: string;
  tipo: 'tutoria' | 'evento' | 'examen' | 'tarea';
  materia?: string;
  prioridad: 'baja' | 'media' | 'alta';
  completado: boolean;
}

export interface Estado {
  id: number;
  usuario_id: number;
  estado_academico: 'activo' | 'inactivo' | 'graduado' | 'suspendido';
  semestre_actual: number;
  creditos_completados: number;
  promedio_general: number;
  materias_cursando: Materia[];
  tutorias_tomadas: number;
  tutorias_impartidas?: number;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  semestre: number;
  nota_actual?: number;
  estado: 'cursando' | 'aprobada' | 'reprobada' | 'retirada';
}