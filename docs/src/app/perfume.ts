import { BehaviorSubject } from 'rxjs';
import Perfume from 'perfume.js';
// import Perfume from '../../../';

export const navigationTiming = new BehaviorSubject({});
export const networkInformation = new BehaviorSubject({
  effectiveType: '--',
  saveData: '--',
});
export const navigatorInformation$ = new BehaviorSubject({
  deviceMemory: '--',
  hardwareConcurrency: '--',
});
export const resourceTiming = new BehaviorSubject({});
export const dataConsumption = new BehaviorSubject({});
export const ttfb = new BehaviorSubject(0);
export const fcp = new BehaviorSubject(0);
export const lcp = new BehaviorSubject(0);
export const fid = new BehaviorSubject(0);
export const cls = new BehaviorSubject(0);
export const tbt = new BehaviorSubject(0);
export const ntbt = new BehaviorSubject(0);
export const fibonacci = new BehaviorSubject(0);
export const custom_fibonacci = new BehaviorSubject(0);
export const openDialog$ = new BehaviorSubject(0);
export const isLowEndDevice$ = new BehaviorSubject(false);
export const isLowEndExperience$ = new BehaviorSubject(false);
export const elHeroLogo = new BehaviorSubject(0);
export const elPageTitle = new BehaviorSubject(0);

// Supports AOT and DI
export function analyticsTracker(options) {
  const { metricName, data, navigatorInformation, rating, attribution } = options;
  if (navigatorInformation && navigatorInformation.deviceMemory) {
    navigatorInformation$.next(navigatorInformation);
    isLowEndDevice$.next(navigatorInformation.isLowEndDevice);
    isLowEndExperience$.next(navigatorInformation.isLowEndExperience);
  }
  console.log(`%c Perfume.js: ${metricName}`, 'color:#ff6d00;font-size:11px;', {
    data,
    ...navigatorInformation,
    rating,
    attribution
  });
  if (
    [
      'TTFB',
      'FCP',
      'LCP',
      'FID',
      'CLS',
      'TBT',
      'NTBT',
    ].includes(metricName)
  ) {
    if ((window as any).ga) {
      (window as any).ga('send', 'event', {
        eventCategory: 'Perfume.js',
        eventAction: metricName,
        // Google Analytics metrics must be integers, so the value is rounded
        eventValue: metricName === 'cls' ? data * 1000 : data,
        eventLabel: navigatorInformation.isLowEndExperience ? 'lowEndExperience' : 'highEndExperience',
        // Use a non-interaction event to avoid affecting bounce rate
        nonInteraction: true,
      });
    }
  }
  switch (metricName) {
    case 'navigationTiming':
      navigationTiming.next(data);
      break;
    case 'networkInformation':
      networkInformation.next(data);
      break;
    case 'resourceTiming':
      resourceTiming.next(data);
      break;
    case 'dataConsumption':
      dataConsumption.next(data);
      break;
    case 'TTFB':
      ttfb.next(data);
      break;
    case 'FCP':
      fcp.next(data);
      break;
    case 'LCP':
      lcp.next(data);
      break;
    case 'FID':
      fid.next(data);
      break;
    case 'CLS':
      cls.next(data);
      break;
    case 'TBT':
      tbt.next(data);
      break;
    case 'NTBT':
      ntbt.next(data);
      break;
    case 'fibonacci':
      fibonacci.next(data);
      break;
    case 'custom_fibonacci':
      custom_fibonacci.next(data);
      break;
    case 'openDialog':
      openDialog$.next(data);
      break;
    case 'elHeroLogo':
      elHeroLogo.next(data);
      break;
    case 'elPageTitle':
      elPageTitle.next(data);
      break;
  }
}

export const PerfumeConfig = {
  resourceTiming: true,
  elementTiming: true,
  analyticsTracker,
};

export const perfume = new Perfume(PerfumeConfig);
