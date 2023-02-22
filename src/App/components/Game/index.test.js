import {render, screen} from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom'
import Game from './index.js'

describe('Game component', () => {
    it('displays header text', () => {
        const { getByText } = render(<Game />);
        const text = getByText(
          (content, element) => {
            return element.textContent === 'Win games to upgrade your robo pic! :)';
          },
          { selector: 'p' }
        );
        expect(text).toBeInTheDocument();
    });
  });