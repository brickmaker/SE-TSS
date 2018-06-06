/* eslint react/no-multi-comp:0, no-console:0 */

// import 'rc-calendar/assets/index.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import { withStyles, Typography } from 'material-ui';
import { setTimeType,setTime } from '../../views/management/actions';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import { Radio } from 'material-ui';

const format = 'YYYY-MM';
const cn = true;
const styles = {

};

class MonthPicker extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            showTime: true,
            disabled: false,
            value: props.defaultValue,
        };
    }

    onChange = (value) => {
        console.log(`DatePicker change: ${value && value.format(format)}`);
        this.setState({
            value,
        });
        this.props.setTime(value);
    }

    onShowTimeChange = (e) => {
        this.setState({
            showTime: e.target.checked,
        });
    }

    toggleDisabled = (event) => {
        // event.preventDefault();
        this.setState({
            disabled: !this.state.disabled,
        });
    }

    render() {
        const state = this.state;
        const { timeType, setTimeType } = this.props;
        const isDisabled = timeType === 'week';
        console.log("timeType", timeType, isDisabled);
        const calendar = (<MonthCalendar
            locale={cn ? zhCN : enUS}
            style={{ zIndex: 1000 }}
        />);
        return (
            <div style={{ width: 220, marginLeft: 10, marginRight: 10, display: "inline-block" }}>
                <div style={{
                    boxSizing: 'border-box',
                    position: 'relative',
                    display: 'inline-block',
                    lineHeight: 1.5,
                    marginBottom: 22,
                }}
                >
                    <Radio
                        checked={timeType === 'month'}
                        onClick={(event) => {
                            if (timeType === 'month')
                                setTimeType('week');
                            else setTimeType('month');
                            console.log(state.value);
                        }}
                        value="month"
                        name="radio-button-demo"
                        aria-label="month"
                    />
                    <Typography style={{ display: "inline-block", marginRight: 10 }}>按月份统计</Typography>
                    <div

                        style={{ display: "inline-block" }}
                    >
                        <DatePicker
                            style={{ display: "inline-block" }}
                            animation="slide-up"
                            disabled={isDisabled}
                            calendar={calendar}
                            value={state.value}
                            onChange={this.onChange}
                        >
                            {
                                ({ value }) => {
                                    return (<input
                                        style={{ width: 70, display: "inline-block" }}
                                        readOnly
                                        disabled={isDisabled}
                                        value={value && value.format(format)}
                                        placeholder="请选择月份"
                                    />);
                                }
                            }

                        </DatePicker>
                    </div>
                </div>
            </div>);
    }
}

MonthPicker.propTypes = {
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MonthPicker);
