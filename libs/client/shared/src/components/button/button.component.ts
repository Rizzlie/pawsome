import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonVariants } from './variants';

@Component({
  selector: 'pawsome-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  disabled = input(false);
  variant = input.required<ButtonVariants>();
  outlined = input(false);

  clicked = output<void>();

  handleClick() {
    this.clicked.emit();
  }
}
