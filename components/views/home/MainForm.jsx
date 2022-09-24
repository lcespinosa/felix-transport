import Form from "../../ui/Form";
import {ca} from 'date-fns/locale';
import {
  endOfWeek,
  format,
  differenceInHours,
  isToday,
  startOfWeek,
  add,
  sub,
  parse,
  startOfQuarter,
  startOfYear
} from "date-fns";
import {useEffect, useState} from "react";
import useDailyReportsQuery from "../../../hooks/useDailyReportsQuery";
import {addDailyReportDocument} from "../../../services/daily_report.service";
import {useAuth} from "../../../context/AuthContext";
import useTotalWeekHours from "../../../hooks/useTotalWeekHours";

export default function MainForm() {
  const {user} = useAuth();

  const today = new Date;
  const startOfWeekDayDate = startOfWeek(today, {weekStartsOn: 1});
  const startOfQuarterDate = format(startOfQuarter(today), 'QQQQ', {locale: ca});
  const startOfWeekDate = format(startOfWeek(today, {weekStartsOn: 1}), 'PPP', {locale: ca});
  const endOfWeekDate = format(sub(endOfWeek(today, {weekStartsOn: 1}), {days: 2}), 'PPP', {locale: ca});
  const weekDayOptions = Array.from({length: 5}).map((day, index) => {
    const date = add(startOfWeekDayDate, {days: index});
    return {
      value: date,
      label: format(date, 'EEEE', {locale: ca}),
      active: isToday(date),
    }
  });
  const [day, setDay] = useState(weekDayOptions.find(d => d.active)?.label || weekDayOptions[0].label);

  const year = format(startOfYear(today), 'yyyy');
  const quarter = format(startOfQuarter(today), 'q');
  const week = format(startOfWeek(today, {weekStartsOn: 1}), 'w');
  const [model, setModel] = useState({
    id: null,
    odo_init: "",
    odo_last: "",
    qte_clients: "",
    qte_retour: "",
    depart: '',
    retour: '',
  });
  const [result, loading, error] = useDailyReportsQuery(year, quarter, week, day, user);
  console.log(result)
  useEffect(() => {
    if (!loading && result) {
      setModel({
        id: result?.docId,
        odo_init: result?.odo_init,
        odo_last: result?.odo_last,
        qte_clients: result?.qte_clients,
        qte_retour: result?.qte_retour,
        depart: result?.depart,
        retour: result?.retour,
      });
    }
  }, [result, loading, error]);

  const handleDayChange = (e) => {
    const {value} = e.target;
    setDay(value);
  }
  const handleInputChange = (e) => {
    const {name: prop, value} = e.target;
    setModel({
      ...model,
      [prop]: value,
    });
  }
  const km_total = model.odo_last - model.odo_init;
  const heures = differenceInHours(parse(model.retour, 'HH:mm', today), parse(model.depart, 'HH:mm', today)) || 0;
  const totalHeures = useTotalWeekHours(year, quarter, week, user);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    addDailyReportDocument(year, quarter, week, day, user.email, {
      ...model,
      heures,
      km_total,
    });
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Day Report</h3>
          <p className="mt-1 font-medium max-w-2xl text-sm text-gray-500">Route: {user.route}</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Trimestre: {startOfQuarterDate}</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Semaine de: {startOfWeekDate} a {endOfWeekDate}</p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Heures Semaine: {totalHeures}</p>
          <div className="mt-1 max-w-2xl text-sm text-gray-500">
            <label htmlFor="week_day" className="block text-sm font-medium text-gray-700">
              Day
            </label>
            <select
              id="week_day"
              name="week_day"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={day}
              onChange={handleDayChange}
            >
              {
                weekDayOptions.map((opt, index) =>
                  <option key={index} value={opt.label}>{opt.label}</option>
                )
              }
            </select>
          </div>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="odometre-init" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Odometre Init.
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                required
                type="number"
                name="odo_init"
                id="odometre-init"
                value={model.odo_init}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="odometre-last" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Odometre Init.
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                required
                type="number"
                name="odo_last"
                id="odometre-last"
                value={model.odo_last}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="km" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Km Total
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                disabled
                id="km"
                type="number"
                name="km"
                value={km_total}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="qte_clients" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Qte. Clients
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                required
                id="qte_clients"
                type="number"
                name="qte_clients"
                value={model.qte_clients}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="qte_retour" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Qte. Retour
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                required
                id="qte_retour"
                type="number"
                name="qte_retour"
                value={model.qte_retour}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="depart" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Depart
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                required
                id="depart"
                type="time"
                name="depart"
                value={model.depart}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="retour" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Retour
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                required
                id="retour"
                type="time"
                name="retour"
                value={model.retour}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="heures" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Heures
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                disabled
                id="heures"
                type="number"
                name="heures"
                value={heures}
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

    </Form>
  )
}
