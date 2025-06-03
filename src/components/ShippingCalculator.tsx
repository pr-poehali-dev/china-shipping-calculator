import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, Ship, Plane, Train } from "lucide-react";

interface ShippingRate {
  method: string;
  price: number;
  days: string;
  icon: React.ReactNode;
}

const ShippingCalculator = () => {
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [destination, setDestination] = useState("");
  const [rubCnyRate, setRubCnyRate] = useState("");
  const [usdRate, setUsdRate] = useState("");
  const [tariffPerKg, setTariffPerKg] = useState("");
  const [packagingCost, setPackagingCost] = useState("");
  const [results, setResults] = useState<ShippingRate[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
    "Нижний Новгород",
    "Челябинск",
    "Самара",
  ];

  const calculateShipping = () => {
    const w = parseFloat(weight) || 0;
    const v = parseFloat(volume) || 0;
    const rubCny = parseFloat(rubCnyRate) || 13.5; // Курс по умолчанию
    const usd = parseFloat(usdRate) || 95; // Курс USD/RUB по умолчанию
    const tariff = parseFloat(tariffPerKg) || 3; // Тариф $/кг по умолчанию
    const packaging = parseFloat(packagingCost) || 10; // Упаковка $ по умолчанию

    // Базовые тарифы (условные)
    const baseRates = {
      sea: 2.5,
      air: 8.5,
      rail: 4.2,
    };

    const cityMultiplier = destination === "Москва" ? 1 : 1.2;
    const volumeWeight = v * 200; // кг из объема
    const chargeableWeight = Math.max(w, volumeWeight);

    const rates: ShippingRate[] = [
      {
        method: "Морская доставка",
        price: Math.round(
          (chargeableWeight * baseRates.sea * cityMultiplier +
            chargeableWeight * tariff +
            packaging) *
            usd,
        ),
        days: "25-35 дней",
        icon: <Ship className="w-5 h-5" />,
      },
      {
        method: "Железная дорога",
        price: Math.round(
          (chargeableWeight * baseRates.rail * cityMultiplier +
            chargeableWeight * tariff +
            packaging) *
            usd,
        ),
        days: "15-20 дней",
        icon: <Train className="w-5 h-5" />,
      },
      {
        method: "Авиадоставка",
        price: Math.round(
          (chargeableWeight * baseRates.air * cityMultiplier +
            chargeableWeight * tariff +
            packaging) *
            usd,
        ),
        days: "5-7 дней",
        icon: <Plane className="w-5 h-5" />,
      },
    ];

    setResults(rates);
    setIsCalculated(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Калькулятор доставки из Китая
        </h1>
        <p className="text-lg text-gray-600">
          Рассчитайте стоимость и сроки доставки вашего груза
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Параметры груза
              </CardTitle>
              <CardDescription>
                Укажите характеристики вашего отправления
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="weight">Вес (кг)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Введите вес груза"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="volume">Объем (м³)</Label>
                <Input
                  id="volume"
                  type="number"
                  step="0.01"
                  placeholder="Введите объем груза"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="destination">Город назначения</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">
                Валютные курсы и тарифы
              </CardTitle>
              <CardDescription>
                Актуальные курсы валют и дополнительные расходы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rubCnyRate">Курс RUB/CNY</Label>
                <Input
                  id="rubCnyRate"
                  type="number"
                  step="0.01"
                  placeholder="13.50"
                  value={rubCnyRate}
                  onChange={(e) => setRubCnyRate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="usdRate">Курс USD/RUB</Label>
                <Input
                  id="usdRate"
                  type="number"
                  step="0.01"
                  placeholder="95.00"
                  value={usdRate}
                  onChange={(e) => setUsdRate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tariffPerKg">Тариф за кг ($)</Label>
                <Input
                  id="tariffPerKg"
                  type="number"
                  step="0.01"
                  placeholder="3.00"
                  value={tariffPerKg}
                  onChange={(e) => setTariffPerKg(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="packagingCost">Стоимость упаковки ($)</Label>
                <Input
                  id="packagingCost"
                  type="number"
                  step="0.01"
                  placeholder="10.00"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculateShipping}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!weight || !volume || !destination}
          >
            Рассчитать стоимость
          </Button>
        </div>

        <Card className="border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-700">Результаты расчета</CardTitle>
            <CardDescription>Варианты доставки и их стоимость</CardDescription>
          </CardHeader>
          <CardContent>
            {!isCalculated ? (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Заполните данные для расчета</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((rate, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{rate.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {rate.method}
                        </div>
                        <div className="text-sm text-gray-500">{rate.days}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {rate.price.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {isCalculated && (
        <Card className="mt-6 border-2 border-yellow-100 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>Расчет веса:</strong> Учитывается максимальное значение
                между фактическим весом ({weight} кг) и объемным весом (
                {(parseFloat(volume) * 200).toFixed(1)} кг)
              </p>
              <p className="mb-2">
                <strong>Валютные курсы:</strong> RUB/CNY:{" "}
                {rubCnyRate || "13.50"}, USD/RUB: {usdRate || "95.00"}
              </p>
              <p className="mb-2">
                <strong>Дополнительные расходы:</strong> Тариф $
                {tariffPerKg || "3.00"}/кг, упаковка ${packagingCost || "10.00"}
              </p>
              <p>
                <strong>Примечание:</strong> Указанные цены являются
                ориентировочными. Финальная стоимость может отличаться в
                зависимости от типа груза и дополнительных услуг.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShippingCalculator;
