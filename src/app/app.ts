import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '@app/public/presentation/components/navbar-component/navbar-component';
import {AuthenticationService} from '@app/iam/services/authentication.service';
import {HealthCheckService} from '@app/shared/services/health-check.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private healthCheckService: HealthCheckService
  ) {}

  protected readonly title = signal('Octane');
  ngOnInit(): void {
    this.authService.tryAutoSignIn();
    // Start health check to keep Render service alive
    this.healthCheckService.startHealthCheck();
  }
}
