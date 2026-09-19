import greetingsData from '@/data/greetings.json';
import { AnimalCategory, GreetingData } from './types';

export function getDynamicGreeting(): GreetingData {
  const now = new Date();
  const dayOfWeek = now.getDay().toString() as keyof typeof greetingsData.dayTemplates;
  const currentHour = now.getHours();

  // Determine time of day
  let timePeriod: 'morning' | 'afternoon' | 'evening' = 'afternoon';
  if (currentHour >= 5 && currentHour < 12) {
    timePeriod = 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    timePeriod = 'afternoon';
  } else {
    timePeriod = 'evening';
  }

  const dayInfo = greetingsData.dayTemplates[dayOfWeek] || greetingsData.dayTemplates["6"];
  const randomDayGreeting = dayInfo.greetings[Math.floor(Math.random() * dayInfo.greetings.length)];
  
  const timePool = greetingsData.timeCallouts[timePeriod];
  const randomTimeCallout = timePool[Math.floor(Math.random() * timePool.length)];

  const dynamicPool = greetingsData.dynamicCallouts;
  const randomFactCallout = dynamicPool[Math.floor(Math.random() * dynamicPool.length)];

  // Category mapping
  const category: AnimalCategory = (dayInfo.defaultCategory as AnimalCategory) || 'cats-dogs';

  // Emoji selection based on day & category
  const emojis = ['🐾', '🦖', '🌊', '🦁', '🐱', '🐶', '🦑', '🦕'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  return {
    greeting: randomDayGreeting,
    subtext: `${randomTimeCallout} ${randomFactCallout}`,
    highlightAnimal: dayInfo.dayName,
    emoji,
    category
  };
}
