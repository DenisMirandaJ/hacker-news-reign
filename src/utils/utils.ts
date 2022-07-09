import Bottleneck from 'bottleneck';

export const apiRateLimiter = new Bottleneck({
  minTime: 100, //miliseconds,
  maxConcurrent: 1,
});
