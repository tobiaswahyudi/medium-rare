import { environment} from '../environments/environment';

export function redirectToHome(): void {
  window.location.assign(environment.baseUrl);
}