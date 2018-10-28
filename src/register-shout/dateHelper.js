import moment from 'moment';
import getTicksToMaxDate from './invertedTicksHelper';

/**
 * Ticks from first day of the year until the max date supported.
 * @return {number}
 */
const getYearTicks = () => getTicksToMaxDate(moment().startOf('year'));

/**
 * Ticks from now until the max date supported.
 * @return {number}
 */
const getNowTicks = () => getTicksToMaxDate(moment().utc());

export { getNowTicks, getYearTicks };
