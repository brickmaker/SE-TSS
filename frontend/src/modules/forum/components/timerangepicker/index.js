import 'rc-calendar/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DatePicker from 'rc-calendar/lib/Picker';
import { withStyles } from 'material-ui';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import { Typography } from 'material-ui';
import { setStartTime, setEndTime } from '../../views/management/actions';

const format = 'YYYY-MM-DD';

const cn = true;
const styles = {};

const now = moment();
if (cn) {
    now.locale('zh-cn').utcOffset(8);
} else {
    now.locale('en-gb').utcOffset(0);
}

class Picker extends React.Component {
    state = {
        hoverValue: [],
    };

    onHoverChange = (hoverValue) => {
        console.log(hoverValue);
        this.setState({ hoverValue });
    }

    render() {
        const props = this.props;
        const { showValue } = props;
        const calendar = (
            <RangeCalendar
                hoverValue={this.state.hoverValue}
                onHoverChange={this.onHoverChange}
                type={this.props.type}
                locale={cn ? zhCN : enUS}
                defaultValue={now}
                format={format}
                onChange={props.onChange}
                disabledDate={props.disabledDate}
            />);
        return (
            <DatePicker
                open={this.props.open}
                onOpenChange={this.props.onOpenChange}
                calendar={calendar}
                value={props.value}
            >
                {
                    () => {
                        return (
                            <span>
                                <input
                                    placeholder="请选择日期"
                                    style={{ width: 80 }}
                                    readOnly
                                    value={showValue && showValue.format(format) || ''}
                                />
                            </span>
                        );
                    }
                }
            </DatePicker>);
    }
}

class TimeRangePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startValue: props.defaultValue,
            endValue: props.defaultValue,
            startOpen: false,
            endOpen: false,
        };
    }

    onStartOpenChange = (startOpen) => {
        this.setState({
            startOpen,
        });
    }

    onEndOpenChange = (endOpen) => {
        this.setState({
            endOpen,
        });
    }

    onStartChange = (value) => {
        this.setState({
            startValue: value[0],
            startOpen: false,
            endOpen: true,
        });
        this.props.setStartTime(value[0]);
    }

    onEndChange = (value) => {
        this.setState({
            endValue: value[1],
        });
        this.props.setEndTime(value[1]);
    }

    disabledStartDate = (endValue) => {
        if (!endValue) {
            return false;
        }
        const startValue = this.state.startValue;
        if (!startValue) {
            return false;
        }
        return endValue.diff(startValue, 'days') < 0;
    }

    render() {
        const state = this.state;
        return (
            <div style={{ width: 400, marginBottom: 20, marginTop:20,display: "inline-block" }}>
                <div style={{ display: "inline-block" , marginLeft:10, marginRight: 10 }}>
                    <Typography style={{ display: "inline-block", marginRight: 10 }}>开始时间: </Typography>
                    <Picker
                        onOpenChange={this.onStartOpenChange}
                        type="start"
                        showValue={state.startValue}
                        open={this.state.startOpen}
                        value={[state.startValue, state.endValue]}
                        onChange={this.onStartChange}
                    />
                </div>
                <div style={{ display: "inline-block", marginLeft: 10, marginRight:10 }} >
                    <Typography style={{ display: "inline-block", marginRight: 10 }}>结束时间: </Typography>
                    <Picker
                        onOpenChange={this.onEndOpenChange}
                        open={this.state.endOpen}
                        type="end"
                        showValue={state.endValue}
                        disabledDate={this.disabledStartDate}
                        value={[state.startValue, state.endValue]}
                        onChange={this.onEndChange}
                    />
                </div>
            </div>);
    }
}

TimeRangePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    setStartTime: (startTime)=>{
        dispatch(setStartTime(startTime));
    },
    setEndTime: (endTime) =>{
        dispatch(setEndTime(endTime));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(TimeRangePicker);
