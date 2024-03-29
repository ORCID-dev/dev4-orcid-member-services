import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { PasswordStrengthComponent } from './password-strength.component'

describe('Component Tests', () => {
  describe('PasswordStrengthBarComponent', () => {
    let comp: PasswordStrengthComponent
    let fixture: ComponentFixture<PasswordStrengthComponent>

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PasswordStrengthComponent],
      })
        .overrideTemplate(PasswordStrengthComponent, '')
        .compileComponents()
    }))

    beforeEach(() => {
      fixture = TestBed.createComponent(PasswordStrengthComponent)
      comp = fixture.componentInstance
    })

    describe('PasswordStrengthComponents', () => {
      it('should initialize with default values', () => {
        expect(comp.measureStrength('')).toBe(0)
        expect(comp.colors).toEqual(['#F00', '#F90', '#FF0', '#9F0', '#0F0'])
        expect(comp.getColor(0).idx).toBe(1)
        expect(comp.getColor(0).col).toBe(comp.colors[0])
      })

      it('should increase strength upon password value change', () => {
        expect(comp.measureStrength('')).toBe(0)
        expect(comp.measureStrength('aa')).toBeGreaterThanOrEqual(comp.measureStrength(''))
        expect(comp.measureStrength('aa^6')).toBeGreaterThanOrEqual(comp.measureStrength('aa'))
        expect(comp.measureStrength('Aa090(**)')).toBeGreaterThanOrEqual(comp.measureStrength('aa^6'))
        expect(comp.measureStrength('Aa090(**)+-07365')).toBeGreaterThanOrEqual(comp.measureStrength('Aa090(**)'))
      })

      it('should change the color based on strength', () => {
        expect(comp.getColor(0).col).toBe(comp.colors[0])
        expect(comp.getColor(11).col).toBe(comp.colors[1])
        expect(comp.getColor(22).col).toBe(comp.colors[2])
        expect(comp.getColor(33).col).toBe(comp.colors[3])
        expect(comp.getColor(44).col).toBe(comp.colors[4])
      })
    })
  })
})
