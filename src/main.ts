import { platformNativeScript, registerElement, runNativeScriptAngularApp } from '@nativescript/angular';
import { AppModule } from './app/app.module';

// Usar el nuevo plugin actualizado
registerElement("PullToRefresh", () => require("@nativescript-community/ui-pulltorefresh").PullToRefresh);

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});