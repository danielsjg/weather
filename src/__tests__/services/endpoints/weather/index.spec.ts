import { getWeatherAPI } from '~/services/modules/weather';

describe('Weather Endpoints', () => {
  it('should return the attributes correctly in getWeatherAPI', async () => {
    const response = await getWeatherAPI({ lat: -16.68, lon: -49.25 });

    const {
      name: city,
      main: { temp, feels_like, humidity, pressure },
      weather: [{ description, icon }],
    } = response.data;

    expect(city).toEqual('Goiânia');
    expect(temp).toEqual(expect.any(Number));
    expect(feels_like).toEqual(expect.any(Number));
    expect(humidity).toEqual(expect.any(Number));
    expect(pressure).toEqual(expect.any(Number));
    expect(description).toEqual(expect.any(String));
    expect(icon).toEqual(expect.any(String));
  });
});
