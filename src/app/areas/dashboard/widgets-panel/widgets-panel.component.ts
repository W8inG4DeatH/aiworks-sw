import { Component, OnInit } from '@angular/core';
import { TranslateService } from './translate.service';

@Component({
  selector: 'app-widgets-panel',
  templateUrl: './widgets-panel.component.html',
  styleUrls: ['./widgets-panel.component.scss']
})
export class WidgetsPanelComponent implements OnInit {
  public translatedJson: any;

  constructor(
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  async onTranslate() {
    try {
      const targetLanguage = 'sk-SK'; // target language
      console.log('targetLanguage:', targetLanguage);
      // Load the JSON file from assets
      const textToTranslate = await this.translateService.translateJson(targetLanguage);
      console.log('textToTranslate:', textToTranslate);
      // Send the JSON file to the backend for translation
      const translated = await this.translateService.sendForTranslation(textToTranslate, targetLanguage);
      console.log('translated:', translated);
      // Assign the translated JSON to a variable
      this.translatedJson = translated;
      console.log('this.translatedJson:', this.translatedJson);
    } catch (error) {
      console.error('Error during translation:', error);
    }
  }
}
