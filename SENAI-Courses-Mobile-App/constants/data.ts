export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  duration: string; // e.g. "40h"
  modality: 'Presencial' | 'EAD' | 'Híbrido';
  level: 'Básico' | 'Intermediário' | 'Avançado';
  rating: number;
  enrolledCount: number;
  isFree: boolean;
  price?: number;
  imageColor: string; // gradient color for card header
  tags: string[];
  instructor: string;
  highlights: string[];
  requirements: string[];
};

export const categories: Category[] = [
  { id: 'tech', name: 'Tecnologia', icon: 'laptop', color: '#005BAA' },
  { id: 'industry', name: 'Indústria', icon: 'wrench.and.screwdriver', color: '#E8001D' },
  { id: 'health', name: 'Saúde', icon: 'heart.fill', color: '#27AE60' },
  { id: 'management', name: 'Gestão', icon: 'chart.bar.fill', color: '#F39C12' },
  { id: 'food', name: 'Gastronomia', icon: 'fork.knife', color: '#9B59B6' },
  { id: 'design', name: 'Design', icon: 'paintpalette.fill', color: '#1ABC9C' },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Programação em Python',
    description:
      'Domine os fundamentos de Python e desenvolva aplicações reais. Ideal para quem quer ingressar no mercado de tecnologia com uma das linguagens mais demandadas do mundo.',
    categoryId: 'tech',
    duration: '80h',
    modality: 'EAD',
    level: 'Básico',
    rating: 4.8,
    enrolledCount: 3421,
    isFree: false,
    price: 299,
    imageColor: '#005BAA',
    tags: ['Python', 'Programação', 'Back-end'],
    instructor: 'Prof. Carlos Mendes',
    highlights: [
      'Certificado reconhecido pelo mercado',
      'Projetos práticos com portfólio',
      'Mentoria ao vivo quinzenal',
      'Acesso vitalício ao material',
    ],
    requirements: ['Computador com internet', 'Noções básicas de informática'],
  },
  {
    id: '2',
    title: 'Manutenção de Equipamentos Industriais',
    description:
      'Aprenda técnicas avançadas de manutenção preventiva e corretiva em equipamentos industriais. Curso com forte componente prático em laboratórios certificados.',
    categoryId: 'industry',
    duration: '120h',
    modality: 'Presencial',
    level: 'Intermediário',
    rating: 4.6,
    enrolledCount: 1854,
    isFree: false,
    price: 450,
    imageColor: '#E8001D',
    tags: ['Manutenção', 'Mecânica', 'Eletromecânica'],
    instructor: 'Prof. Roberto Lima',
    highlights: [
      'Aulas 100% práticas em laboratório',
      'Certificação MTE reconhecida',
      'Parceria com indústrias locais',
    ],
    requirements: ['Ensino Médio completo', 'EPI próprio'],
  },
  {
    id: '3',
    title: 'Desenvolvimento Web Full Stack',
    description:
      'Torne-se um desenvolvedor completo, dominando front-end e back-end. Aprenda HTML, CSS, JavaScript, Node.js e bancos de dados na prática.',
    categoryId: 'tech',
    duration: '160h',
    modality: 'Híbrido',
    level: 'Intermediário',
    rating: 4.9,
    enrolledCount: 5670,
    isFree: false,
    price: 599,
    imageColor: '#2C3E50',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React'],
    instructor: 'Profa. Ana Beatriz Souza',
    highlights: [
      'Projeto final com deploy real',
      'Preparação para entrevistas',
      'Comunidade exclusiva de alunos',
      'Acesso a vagas parceiras',
    ],
    requirements: ['Lógica de programação básica', 'Computador com 8GB RAM'],
  },
  {
    id: '4',
    title: 'Gestão de Qualidade e Processos',
    description:
      'Capacitação completa em metodologias de qualidade como ISO 9001, Lean Manufacturing e Six Sigma. Impulsione sua carreira na gestão industrial.',
    categoryId: 'management',
    duration: '60h',
    modality: 'EAD',
    level: 'Avançado',
    rating: 4.5,
    enrolledCount: 2103,
    isFree: false,
    price: 380,
    imageColor: '#F39C12',
    tags: ['ISO 9001', 'Lean', 'Six Sigma', 'Qualidade'],
    instructor: 'Prof. Fernando Alves',
    highlights: [
      'Preparatório para certificação ISO',
      'Cases reais de indústrias brasileiras',
      'Ferramentas práticas de diagnóstico',
    ],
    requirements: ['Experiência profissional mínima de 1 ano'],
  },
  {
    id: '5',
    title: 'Cuidados com o Paciente',
    description:
      'Formação completa para auxiliares e técnicos em saúde. Aborda desde higiene e conforto do paciente até procedimentos clínicos supervisionados.',
    categoryId: 'health',
    duration: '100h',
    modality: 'Presencial',
    level: 'Básico',
    rating: 4.7,
    enrolledCount: 2980,
    isFree: false,
    price: 420,
    imageColor: '#27AE60',
    tags: ['Saúde', 'Enfermagem', 'Cuidador'],
    instructor: 'Enf. Mariana Ferreira',
    highlights: [
      'Estágio supervisionado incluso',
      'Material didático completo',
      'Certificação pelo Conselho Regional',
    ],
    requirements: ['Ensino Médio completo', 'Vacinação em dia'],
  },
  {
    id: '6',
    title: 'Confeitaria Artesanal',
    description:
      'Do básico ao avançado em confeitaria. Aprenda técnicas francesas, decoração com chantilly, fondant, e criação de bolos personalizados para eventos.',
    categoryId: 'food',
    duration: '40h',
    modality: 'Presencial',
    level: 'Básico',
    rating: 4.9,
    enrolledCount: 1340,
    isFree: false,
    price: 220,
    imageColor: '#9B59B6',
    tags: ['Confeitaria', 'Bolos', 'Gastronomia'],
    instructor: 'Chef Patricia Rocha',
    highlights: [
      'Ingredientes e materiais inclusos',
      'Leve suas criações para casa',
      'Receituário digital exclusivo',
    ],
    requirements: ['Nenhum — iniciante bem-vindo!'],
  },
  {
    id: '7',
    title: 'Design Gráfico e Identidade Visual',
    description:
      'Aprenda a criar marcas, peças gráficas e materiais digitais usando Adobe Illustrator e Photoshop. Transforme sua criatividade em carreira.',
    categoryId: 'design',
    duration: '80h',
    modality: 'Híbrido',
    level: 'Básico',
    rating: 4.6,
    enrolledCount: 3210,
    isFree: false,
    price: 350,
    imageColor: '#1ABC9C',
    tags: ['Design', 'Adobe', 'Branding', 'Illustrator'],
    instructor: 'Prof. Diego Cavalcante',
    highlights: [
      'Software licenciado incluso',
      'Portfólio profissional ao final',
      'Feedback individual de projetos',
    ],
    requirements: ['Computador com Adobe Creative Cloud'],
  },
  {
    id: '8',
    title: 'Introdução à Inteligência Artificial',
    description:
      'Entenda os fundamentos de IA, Machine Learning e suas aplicações práticas na indústria. Curso pensado para profissionais não-técnicos que querem se atualizar.',
    categoryId: 'tech',
    duration: '30h',
    modality: 'EAD',
    level: 'Básico',
    rating: 4.7,
    enrolledCount: 8120,
    isFree: true,
    imageColor: '#6C5CE7',
    tags: ['IA', 'Machine Learning', 'Tecnologia'],
    instructor: 'Profa. Juliana Martins',
    highlights: [
      'Totalmente gratuito',
      'Certificado digital ao concluir',
      'Aulas curtas de 10 minutos',
    ],
    requirements: ['Computador ou smartphone com internet'],
  },
];
