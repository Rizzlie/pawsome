import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pawsome-homepage-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './feature-shell.component.html',
  styleUrl: './feature-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureShellComponent {}
