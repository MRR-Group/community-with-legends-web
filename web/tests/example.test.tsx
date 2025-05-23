import { expect, it, describe } from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
describe('example test', ()=>{
    it('should pass', ()=>{
        expect(true).toBe(true)
    })

    it('show example div', () => {
        // ARRANGE
        render(<div>Example</div>)

        expect(screen.getByText('Example')).toBeDefined()
    })
})

