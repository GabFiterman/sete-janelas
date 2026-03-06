import {
  computerIcon,
  downloadsIcon,
  favoritesIcon,
  fileExplorerIcon,
  folderIcon,
  internetExplorerIcon,
  musicsIcon,
  notepadIcon,
  pictureIcon,
  videosIcon,
  workspaceIcon,
  GithubExternalLogo,
  LinkedinExternalLogo,
  WhatsappExternalLogo,
  LettLogo,
  LeafletZenLogo,
  LocaWebLogo,
} from '@/assets';
import { type FileSystemItem } from '../file-system-map';

// ROOT LEVEL 0 [ DRIVE ROOT C: ]
export const ITEMS_MAP_C_DRIVE: Record<string, FileSystemItem> = {
  'C:': {
    extension: '/',
    iconSrc: computerIcon,
    label: 'C:',
    path: 'C:',
    type: 'drive',
    uri: '/',
  },
};

// ROOT LEVEL 1 [ DRIVE ROOT C: ]
export const ITEMS_MAP_ROOT: Record<string, FileSystemItem> = {
  'C:/USUARIOS': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Usuários',
    path: 'C:/Usuários',
    type: 'folder',
    uri: 'usuarios/',
  },

  'C:/ARQUIVOS_DE_PROGRAMAS': {
    extension: '/',
    iconSrc: folderIcon,
    path: 'C:/Arquivos de programas',
    label: 'Arquivos de Programas',
    type: 'folder',
    uri: 'programas/',
  },
};

// ROOT LEVEL 2 [ USUÁRIOS ]
export const ITEMS_MAP_USERS: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Fiterman',
    path: 'C:/Usuários/Fiterman',
    type: 'folder',
    uri: 'fiterman/',
  },

  'C:/USUARIOS/PUBLICO': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Público',
    path: 'C:/Usuários/Público',
    type: 'folder',
    uri: 'publico/',
  },
};

// ROOT LEVEL 3 [ FITERMAN ]
export const ITEMS_MAP_FITERMAN: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/FAVORITOS': {
    extension: '/',
    iconSrc: favoritesIcon,
    label: 'Favoritos',
    path: 'C:/Usuários/Fiterman/Favoritos',
    type: 'folder',
    uri: 'favoritos/',
  },

  'C:/USUARIOS/FITERMAN/AREA_DE_TRABALHO': {
    extension: '/',
    iconSrc: workspaceIcon,
    label: 'Área de Trabalho',
    path: 'C:/Usuários/Fiterman/Área de Trabalho',
    type: 'folder',
    uri: 'area_de_trabalho/',
  },

  'C:/USUARIOS/FITERMAN/BIBLIOTECAS': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Bibliotecas',
    path: 'C:/Usuários/Fiterman/Bibliotecas',
    type: 'folder',
    uri: 'bibliotecas/',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Projetos',
    path: 'C:/Usuários/Fiterman/Projetos',
    type: 'folder',
    uri: 'projetos/',
  },

  'C:/USUARIOS/FITERMAN/COMPUTADOR': {
    extension: '/',
    iconSrc: computerIcon,
    label: 'Computador',
    path: 'C:/Usuários/Fiterman',
    type: 'folder',
    uri: 'computador/',
  },

  'C:/USUARIOS/FITERMAN/DOCUMENTOS': {
    extension: '/',
    iconSrc: fileExplorerIcon,
    label: 'Documentos',
    path: 'C:/Usuários/Fiterman/Documentos',
    type: 'folder',
    uri: 'documentos/',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS': {
    extension: '/',
    iconSrc: pictureIcon,
    label: 'Imagens',
    path: 'C:/Usuários/Fiterman/Imagens',
    type: 'folder',
    uri: 'imagens/',
  },

  'C:/USUARIOS/FITERMAN/DOWNLOADS': {
    extension: '/',
    iconSrc: downloadsIcon,
    label: 'Downloads',
    path: 'C:/Usuários/Fiterman/Downloads',
    type: 'folder',
    uri: 'downloads/',
  },

  'C:/USUARIOS/FITERMAN/MÚSICAS': {
    extension: '/',
    iconSrc: musicsIcon,
    label: 'Músicas',
    path: 'C:/Usuários/Fiterman/Músicas',
    type: 'folder',
    uri: 'musicas/',
  },

  'C:/USUARIOS/FITERMAN/VIDEOS': {
    extension: '/',
    iconSrc: videosIcon,
    label: 'Vídeos',
    path: 'C:/Usuários/Fiterman/Videos',
    type: 'folder',
    uri: 'videos/',
  },
};

// ROOT LEVEL 4 [ DOCUMENTOS ]
export const ITEMS_MAP_DOCUMENTS: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Sobre Mim',
    path: 'C:/Usuários/Fiterman/Documentos/Sobre_Mim',
    type: 'folder',
    uri: 'documentos/sobre_mim/',
  },
};

// ROOT LEVEL 4 [ IMAGENS ]
export const ITEMS_MAP_IMAGES: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/IMAGENS/MARACUJÁ.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Maracujá',
    path: 'C:/Usuários/Fiterman/Imagens/Maracujá.webp',
    type: 'file',
    uri: 'imagens/maracuja.webp',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/ALFACE.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Alface',
    path: 'C:/Usuários/Fiterman/Imagens/Alface.webp',
    type: 'file',
    uri: 'imagens/alface.webp',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/PAO_DE_QUEIJO.JPG': {
    extension: '.jpg',
    iconSrc: pictureIcon,
    label: 'Pão de Queijo',
    path: 'C:/Usuários/Fiterman/Imagens/pao_de_queijo.jpg',
    type: 'file',
    uri: 'imagens/pao_de_queijo.jpg',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/FLOWER.JPG': {
    extension: '.jpg',
    iconSrc: pictureIcon,
    label: 'Flowers',
    path: 'C:/Usuários/Fiterman/Imagens/flower.jpg',
    type: 'file',
    uri: 'imagens/flower.jpg',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/DEVFITERMAN.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Dev.Fiterman',
    path: 'C:/Usuários/Fiterman/Imagens/dev-fiterman.webp',
    type: 'file',
    uri: 'imagens/dev-fiterman.webp',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL1.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Gabriel(1)',
    path: 'C:/Usuários/Fiterman/Imagens/gabriel(1).webp',
    type: 'file',
    uri: 'imagens/gabriel(1).webp',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL2.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Gabriel(2)',
    path: 'C:/Usuários/Fiterman/Imagens/gabriel(2).webp',
    type: 'file',
    uri: 'imagens/gabriel(2).webp',
  },

  'C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL3.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Gabriel(3)',
    path: 'C:/Usuários/Fiterman/Imagens/gabriel(3).webp',
    type: 'file',
    uri: 'imagens/gabriel(3).webp',
  },
};

// ROOT LEVEL 4 [ VIDEOS ]
export const ITEMS_MAP_VIDEOS: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/VIDEOS/JIMMY_HENDRIX.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Jimmy Hendrix',
    path: 'C:/Usuários/Fiterman/Videos/Jimmy_Hendrix.mp4',
    type: 'file',
    uri: 'videos/jimmy_hendrix.mp4',
  },

  'C:/USUARIOS/FITERMAN/VIDEOS/AMOR_FATAL.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Amor Fatal',
    path: 'C:/Usuários/Fiterman/Videos/Amor_Fatal.mp4',
    type: 'file',
    uri: 'videos/amor_fatal.mp4',
  },

  'C:/USUARIOS/FITERMAN/VIDEOS/TEASER_TOPGUN.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Teaser Topgun',
    path: 'C:/Usuários/Fiterman/Videos/Teaser_Topgun.mp4',
    type: 'file',
    uri: 'videos/teaser_topgun.mp4',
  },
};

// ROOT LEVEL 4 [ PROJETOS ]
export const ITEMS_MAP_PROJETOS: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Challenge Lett',
    path: 'C:/Usuários/Fiterman/Projetos/ChallengeLett',
    type: 'folder',
    uri: 'projetos/ChallengeLett/',
  },
  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Loca Web',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb',
    type: 'folder',
    uri: 'projetos/LocaWeb/',
  },
  'C:/USUARIOS/FITERMAN/PROJETOS/LEAFLETZEN': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Leaflet Zen',
    path: 'C:/Usuários/Fiterman/Projetos/LeafletZen',
    type: 'folder',
    uri: 'projetos/LeafletZen/',
  },
  'C:/USUARIOS/FITERMAN/PROJETOS/SETEJANELAS': {
    extension: '/',
    iconSrc: folderIcon,
    label: 'Sete Janelas',
    path: 'C:/Usuários/Fiterman/Projetos/SeteJanelas',
    type: 'folder',
    uri: 'projetos/SeteJanelas/',
  },
};

// ROOT LEVEL 5 [ PROJETOS/CHALLENGE_LETT ]
export const ITEMS_MAP_PROJETO_1_CHALLENGELETT: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT/ANALISE.TXT': {
    extension: '.txt',
    iconSrc: notepadIcon,
    label: 'Análise',
    path: 'C:/Usuários/Fiterman/Projetos/ChallengeLett/analise.txt',
    type: 'file',
    uri: 'projetos/ChallengeLett/analise.txt',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT/CHALLENGELETT.HTML': {
    extension: '.html',
    iconSrc: internetExplorerIcon,
    label: 'Challenge Lett',
    path: 'C:/Usuários/Fiterman/Projetos/ChallengeLett/challengelett.html',
    type: 'link',
    uri: 'https://gabfiterman.github.io/ChallengeLett/',
    miniature: LettLogo,
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT/REPOCHALLENGELETT.HTML': {
    extension: '.html',
    iconSrc: GithubExternalLogo,
    label: 'Github Repo ChallengeLett',
    path: 'C:/Usuários/Fiterman/Projetos/ChallengeLett/repochallengelett.html',
    type: 'externalLink',
    uri: 'https://github.com/GabFiterman/ChallengeLett/',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT/HOMEQUERY.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Home and Query',
    path: 'C:/Usuários/Fiterman/Projetos/ChallengeLett/home_query.webp',
    type: 'file',
    uri: 'projetos/ChallengeLett/home_query.webp',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/CHALLENGELETT/about_me_page.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'About Me',
    path: 'C:/Usuários/Fiterman/Projetos/ChallengeLett/about_me_page.webp',
    type: 'file',
    uri: 'projetos/ChallengeLett/about_me_page.webp',
  },
};

// ROOT LEVEL 5 [ PROJETOS/LOCAWEB ]
export const ITEMS_MAP_PROJETO_2_LOCAWEB: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/ANALISE.TXT': {
    extension: '.txt',
    iconSrc: notepadIcon,
    label: 'Análise',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/analise.txt',
    type: 'file',
    uri: 'projetos/LocaWeb/analise.txt',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/LOGIN.TXT': {
    extension: '.txt',
    iconSrc: notepadIcon,
    label: 'Login',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/login.txt',
    type: 'file',
    uri: 'projetos/LocaWeb/login.txt',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/LOCAWEB.HTML': {
    extension: '.html',
    iconSrc: internetExplorerIcon,
    label: 'Loca Web',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/locaweb.html',
    type: 'link',
    uri: 'https://loca-web.vercel.app/',
    miniature: LocaWebLogo,
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/REPOLOCAWEB.HTML': {
    extension: '.html',
    iconSrc: GithubExternalLogo,
    label: 'Github Repo LocaWeb',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/repolocaweb.html',
    type: 'externalLink',
    uri: 'https://github.com/GabFiterman/loca-web/',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/BASICS.GIF': {
    extension: '.gif',
    iconSrc: pictureIcon,
    label: 'Basics',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/basics.gif',
    type: 'file',
    uri: 'https://github.com/GabFiterman/loca-web/assets/94033226/451e419a-9319-4a80-9403-75d91a134e95',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/PLANS.WEBP': {
    extension: '.webp',
    iconSrc: pictureIcon,
    label: 'Plans',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/plans.webp',
    type: 'file',
    uri: 'projetos/LocaWeb/plans.webp',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/AUTOMATEDTESTS.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Testes Automatizados',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/automated_tests.mp4',
    type: 'file',
    uri: 'https://github.com/GabFiterman/loca-web/assets/94033226/e9e2da7b-a95a-4a8a-bf45-6bd2a3c730a6',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/RESPONSIVITY.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Responsividade',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/responsivity.mp4',
    type: 'file',
    uri: 'https://github.com/GabFiterman/loca-web/assets/94033226/d495f731-f815-42e3-b74a-7c8fc7f5868f',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/validation.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Validação de Formulários',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/validation.mp4',
    type: 'file',
    uri: 'https://github.com/GabFiterman/loca-web/assets/94033226/6e48c0ad-3bf8-4e65-b5f9-f73f7e95f87c',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LOCAWEB/AvatarGeneration.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Geração de Avatar',
    path: 'C:/Usuários/Fiterman/Projetos/LocaWeb/AvatarGeneration.mp4',
    type: 'file',
    uri: 'https://github.com/GabFiterman/loca-web/assets/94033226/d495f731-f815-42e3-b74a-7c8fc7f5868f',
  },
};

// ROOT LEVEL 5 [ PROJETOS/LEAFLETZEN ]
export const ITEMS_MAP_PROJETO_3_LEAFLETZEN: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/PROJETOS/LEAFLETZEN/ANALISE.TXT': {
    extension: '.txt',
    iconSrc: notepadIcon,
    label: 'Análise',
    path: 'C:/Usuários/Fiterman/Projetos/LeafletZen/analise.txt',
    type: 'file',
    uri: 'projetos/LeafletZen/analise.txt',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LEAFLETZEN/DEMOGERAL.MP4': {
    extension: '.mp4',
    iconSrc: videosIcon,
    label: 'Demonstração geral',
    path: 'C:/Usuários/Fiterman/Projetos/LeafletZen/demo_geral.mp4',
    type: 'file',
    uri: 'https://github.com/GabFiterman/leaflet-zen/assets/94033226/ce30a530-2e78-44fe-b431-899b20ef6809',
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LEAFLETZEN/LEAFLETZEN.HTML': {
    extension: '.html',
    iconSrc: internetExplorerIcon,
    label: 'Leaflet Zen',
    path: 'C:/Usuários/Fiterman/Projetos/LeafletZen/LeafletZen.html',
    type: 'link',
    uri: 'https://leaflet-zen.vercel.app/',
    miniature: LeafletZenLogo,
  },

  'C:/USUARIOS/FITERMAN/PROJETOS/LEAFLETZEN/REPOLEAFLETZEN.HTML': {
    extension: '.html',
    iconSrc: GithubExternalLogo,
    label: 'Github Repo Leaflet Zen',
    path: 'C:/Usuários/Fiterman/Projetos/LeafletZen/repoleafletzen.html',
    type: 'externalLink',
    uri: 'https://github.com/GabFiterman/leaflet-zen/',
  },
};

// ROOT LEVEL 5 [ PROJETOS/SETEJANELAS ]
export const ITEMS_MAP_PROJETO_4_SETEJANELAS: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/PROJETOS/SETEJANELAS/REPOSETEJANELAS.HTML': {
    extension: '.html',
    iconSrc: GithubExternalLogo,
    label: 'Github Repo Sete Janelas',
    path: 'C:/Usuários/Fiterman/Projetos/SeteJanelas/reposetejanelas.html',
    type: 'externalLink',
    uri: 'https://github.com/GabFiterman/s7te-janelas/',
  },
  'C:/USUARIOS/FITERMAN/PROJETOS/SETEJANELAS/BACKLOG.MD': {
    extension: '.md',
    iconSrc: notepadIcon,
    label: 'Backlog - Sete Janelas',
    path: 'C:/Usuários/Fiterman/Projetos/SeteJanelas/backlog.md',
    type: 'file',
    uri: '/projetos/SeteJanelas/backlog.md',
  },
  'C:/USUARIOS/FITERMAN/PROJETOS/SETEJANELAS/CHANGELOG.MD': {
    extension: '.md',
    iconSrc: notepadIcon,
    label: 'Changelog - Sete Janelas',
    path: 'C:/Usuários/Fiterman/Projetos/SeteJanelas/changelog.md',
    type: 'file',
    uri: '/projetos/SeteJanelas/changelog.md',
  },
  'C:/USUARIOS/FITERMAN/PROJETOS/SETEJANELAS/ABOUT.MD': {
    extension: '.md',
    iconSrc: notepadIcon,
    label: 'Sobre o Sete Janelas',
    path: 'C:/Usuários/Fiterman/Projetos/SeteJanelas/about.md',
    type: 'file',
    uri: '/projetos/SeteJanelas/about.md',
  },
};

// ROOT LEVEL 5 [ DOCUMENTOS/ABOUT_ME ]
export const ITEMS_MAP_ABOUT_ME: Record<string, FileSystemItem> = {
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/README.MD': {
    extension: '.md',
    iconSrc: notepadIcon,
    label: 'Sobre Mim',
    path: 'C:/Usuários/Fiterman/Documentos/Sobre_Mim/README.md',
    type: 'file',
    uri: 'documentos/sobre_mim/README.md',
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/DEVFITERMAN.WEBP': {
    ...ITEMS_MAP_IMAGES['C:/USUARIOS/FITERMAN/IMAGENS/DEVFITERMAN.WEBP'],
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/GABRIEL1.WEBP': {
    ...ITEMS_MAP_IMAGES['C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL1.WEBP'],
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/GABRIEL2.WEBP': {
    ...ITEMS_MAP_IMAGES['C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL2.WEBP'],
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/GABRIEL3.WEBP': {
    ...ITEMS_MAP_IMAGES['C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL3.WEBP'],
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/LINKEDIN.HTML': {
    extension: '.html',
    iconSrc: LinkedinExternalLogo,
    label: 'Linkedin',
    path: 'C:/Usuários/Fiterman/Documentos/Sobre_Mim/linkedin.html',
    type: 'externalLink',
    uri: 'https://www.linkedin.com/in/gabfiterman/',
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/GITHUB.HTML': {
    extension: '.html',
    iconSrc: GithubExternalLogo,
    label: 'Github',
    path: 'C:/Usuários/Fiterman/Documentos/Sobre_Mim/github.html',
    type: 'externalLink',
    uri: 'https://github.com/GabFiterman',
  },
  'C:/USUARIOS/FITERMAN/DOCUMENTOS/SOBRE_MIM/WHATSAPP.HTML': {
    extension: '.html',
    iconSrc: WhatsappExternalLogo,
    label: 'Whatsapp',
    path: 'C:/Usuários/Fiterman/Documentos/Sobre_Mim/whatsapp.html',
    type: 'externalLink',
    uri: 'https://wa.me/5562984602348',
  },
};

// EXPORT ALL AS: ITEMS_MAP_ALL
export const ITEMS_MAP_ALL: Record<string, FileSystemItem> = {
  ...ITEMS_MAP_C_DRIVE,
  ...ITEMS_MAP_ROOT,
  ...ITEMS_MAP_USERS,
  ...ITEMS_MAP_FITERMAN,
  ...ITEMS_MAP_DOCUMENTS,
  ...ITEMS_MAP_IMAGES,
  ...ITEMS_MAP_VIDEOS,
  ...ITEMS_MAP_PROJETOS,
  ...ITEMS_MAP_PROJETO_1_CHALLENGELETT,
  ...ITEMS_MAP_PROJETO_2_LOCAWEB,
  ...ITEMS_MAP_PROJETO_3_LEAFLETZEN,
  ...ITEMS_MAP_PROJETO_4_SETEJANELAS,
  ...ITEMS_MAP_ABOUT_ME,
};
