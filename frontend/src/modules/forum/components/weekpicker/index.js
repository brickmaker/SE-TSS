/* eslint react/no-multi-comp:0, no-console:0 */

// import 'rc-calendar/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import { setTimeType, setTime } from '../../views/management/actions';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import { Radio, Typography } from 'material-ui';
import { withStyles } from 'material-ui';


const format = 'YYYY-Wo';
const cn = true;

const now = moment();
if (cn) {
    now.locale('zh-cn').utcOffset(8);
} else {
    now.locale('en-gb').utcOffset(0);
}

const style = `
.week-calendar {
  width: 386px;
}
.week-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-date {
  background: #000000;
}

.week-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-selected-day .rc-calendar-date {
    background: #000000;
}

.week-calendar .week-calendar-sidebar {
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  width:100px;
  border-right: 1px solid #ccc;
}
.week-calendar .rc-calendar-panel {
  margin-left: 100px;
}
`;
const styles = {

};

class WeekPicker extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.object,
        defaultCalendarValue: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: props.defaultValue,
        };
    }


    onChange = (value) => {
        console.log('DatePicker change: ', (value && value.format(format)));
        this.setState({
            value,
        });
        this.props.setTime(value);
    }

    onOpenChange = (open) => {
        this.setState({
            open,
        });
    }

    dateRender = (current) => {
        const selectedValue = this.state.value;
        if (selectedValue && current.year() === selectedValue.year() &&
            current.week() === selectedValue.week()) {
            return (<div className="rc-calendar-selected-day">
                <div className="rc-calendar-date">
                    {current.date()}
                </div>
            </div>);
        }
        return (
            <div className="rc-calendar-date">
                {current.date()}
            </div>);
    }

    render() {
        const state = this.state;
        const { setTimeType, timeType } = this.props;
        const isDisabled = timeType === 'month';
        const calendar = (
            <Calendar
                className="week-calendar"
                showWeekNumber
                renderSidebar={this.renderSidebar}
                dateRender={this.dateRender}
                locale={cn ? zhCN : enUS}
                format={format}
                style={{ zIndex: 1000 }}
                dateInputPlaceholder="请选择周"
                defaultValue={now}
                showDateInput
            />);
        return (
            <div style={{ width: 220, marginLeft: 10, marginRight: 10, display: "inline-block" }}>
                <div style={{
                    boxSizing: 'border-box',
                    position: 'relative',
                    display: 'block',
                    lineHeight: 1.5,
                    marginBottom: 22,
                }}
                >
                    <Radio
                        checked={timeType === 'week'}
                        onClick={(event) => {
                            if (timeType === 'month')
                                setTimeType('week');
                            else setTimeType('month');
                        }}
                        value="month"
                        name="radio-button-demo"
                        aria-label="month"
                    />
                    <Typography style={{ display: "inline-block", marginRight: 10 }}>按周统计</Typography>
                    <DatePicker
                        onOpenChange={this.onOpenChange}
                        open={this.state.open}
                        animation="slide-up"
                        calendar={calendar}
                        value={state.value}
                        onChange={this.onChange}
                            disabled={isDisabled}
                    >
                        {
                            ({ value }) => {
                                return (
                                    <span tabIndex="0">
                                        <input
                                            placeholder="请选择周"
                                            style={{ width: 70 }}
                            disabled={isDisabled}
                                            readOnly
                                            tabIndex="-1"
                                            className="ant-calendar-picker-input ant-input"
                                            value={value && value.format(format) || ''}
                                        />
                                    </span>
                                );
                            }
                        }
                    </DatePicker>
                </div>
            </div>);
    }
}

WeekPicker.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    timeType: state.forum.management.timeType,
});

const mapDispatchToProps = (dispatch) => ({
    setTimeType: (timeType) => {
        dispatch(setTimeType(timeType));
    },
    setTime: (time)=>{
        dispatch(setTime(time));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(WeekPicker);
