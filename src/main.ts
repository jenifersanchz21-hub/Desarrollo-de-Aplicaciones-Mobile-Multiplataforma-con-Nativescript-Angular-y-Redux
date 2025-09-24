import { platformNativeScriptDynamic } from '@nativescript/angular';
import { AppModule } from './app/app.module';

// Registrar el PullToRefresh con el nuevo plugin.
import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
registerElement("PullToRefresh", () => PullToRefresh);

// Iniciar la aplicación con el módulo de NativeScript.
platformNativeScriptDynamic().bootstrapModule(AppModule);