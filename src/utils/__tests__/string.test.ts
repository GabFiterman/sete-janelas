import { describe, it, expect } from 'vitest';
import {
  normalizeStringForPath,
  getPartialPath,
  isImageByExtension,
  isVideoByExtension,
  isTextByExtension,
  isPdfByExtension,
} from '../string';

describe('String Utilities', () => {
  describe('normalizeStringForPath', () => {
    it('should convert strings to uppercase and remove accents', () => {
      expect(normalizeStringForPath('Músicas')).toBe('MUSICAS');
      expect(normalizeStringForPath('Usuários')).toBe('USUARIOS');
      expect(normalizeStringForPath('Área de Trabalho')).toBe('AREA_DE_TRABALHO');
      expect(normalizeStringForPath('Sistema de Arquivos')).toBe('SISTEMA_DE_ARQUIVOS');
    });

    it('should replace spaces and hyphens with underscores', () => {
      expect(normalizeStringForPath('meu-arquivo-teste')).toBe('MEU_ARQUIVO_TESTE');
      expect(normalizeStringForPath('meu arquivo teste')).toBe('MEU_ARQUIVO_TESTE');
    });

    it('should return empty string if input is empty or null', () => {
      expect(normalizeStringForPath('')).toBe('');
    });
  });

  describe('getPartialPath', () => {
    it('should return parent directory path', () => {
      expect(getPartialPath('C:/Fiterman/Documentos/doc.txt')).toBe('C:/Fiterman/Documentos');
      expect(getPartialPath('C:/Músicas/Artistas')).toBe('C:/Músicas');
    });
  });

  describe('Extension validators', () => {
    it('isImageByExtension should identify images correctly', () => {
      expect(isImageByExtension('.jpg')).toBe(true);
      expect(isImageByExtension('.png')).toBe(true);
      expect(isImageByExtension('.webp')).toBe(true);
      expect(isImageByExtension('.PNG')).toBe(true);
      expect(isImageByExtension('.pdf')).toBe(false);
    });

    it('isVideoByExtension should identify videos correctly', () => {
      expect(isVideoByExtension('.mp4')).toBe(true);
      expect(isVideoByExtension('.avi')).toBe(true);
      expect(isVideoByExtension('.txt')).toBe(false);
    });

    it('isTextByExtension should identify text documents correctly', () => {
      expect(isTextByExtension('.txt')).toBe(true);
      expect(isTextByExtension('.md')).toBe(true);
      expect(isTextByExtension('.pdf')).toBe(false);
    });

    it('isPdfByExtension should identify PDFs correctly', () => {
      expect(isPdfByExtension('.pdf')).toBe(true);
      expect(isPdfByExtension('.PDF')).toBe(true);
      expect(isPdfByExtension('.txt')).toBe(false);
    });
  });
});
