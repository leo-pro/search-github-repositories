import React from 'react';
import { FooterContent } from './styles';

export default function Footer() {
  return (
    <FooterContent>
      &copy; Desenvolvido por
      <a href="http://devleo.com.br" target="_blank" rel="noopener noreferrer">
        {'  { DevLeo }  '}
      </a>
      - 2020
    </FooterContent>
  );
}
