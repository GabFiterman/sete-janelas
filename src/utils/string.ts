/**
 * Normaliza uma string para uso em Paths ou Aliases (SSOT Keys).
 * * 1. Remove acentos.
 * 2. Substitui espaços e hífens por underscore (_).
 * 3. Converte para MAIÚSCULO.
 *
 * @param str A string de entrada (Ex: 'Meus Projetos-1').
 * @returns A string normalizada (Ex: 'MEUS_PROJETOS_1').
 */
export function normalizeStringForPath(str: string): string {
  if (!str) return '';

  const withoutAccents = str.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
  const upperCaseStr = withoutAccents.toUpperCase();
  const normalized = upperCaseStr.replace(/[- ]/g, '_');

  return normalized;
}

/**
 * Retorna o caminho do diretório pai
 * Ex.: 'C:/Fiterman/Documentos/Primeiro_Documento.txt' -> 'C:/Fiterman/Documentos'
 * @param extension A string de entrada
 * @returns string
 */
export const getPartialPath = (path: string): string => {
  return path.split('/').slice(0, -1).join('/');
};

/**
 * @param extension A string de entrada
 * @returns bool
 */
export const isImageByExtension = (extension: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.includes(extension.toLowerCase());
};

/**
 * @param extension A string de entrada
 * @returns bool
 */
export const isVideoByExtension = (extension: string) => {
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
  return videoExtensions.includes(extension.toLowerCase());
};

/**
 * @param extension A string de entrada
 * @returns bool
 */
export const isTextByExtension = (extension: string) => {
  const textExtensions = ['.txt', '.md', '.doc', '.docx'];
  return textExtensions.includes(extension.toLowerCase());
};

/**
 * @param extension A string de entrada
 * @returns bool
 */
export const isPdfByExtension = (extension: string) => {
  const pdfExtensions = ['.pdf'];
  return pdfExtensions.includes(extension.toLowerCase());
};
