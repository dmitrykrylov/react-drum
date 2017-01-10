import React from 'react';
import './drum.scss';


class Drum extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 0,
      initialized: false,
      offset: 0,
      drag: false
    };
  }

  componentDidMount() {
    this.setState({ initialized: true, offset: this.calculateDefaultOffset() });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.current !== nextState.current) {
      let index = this.normalizeOptionIndex(this.getClosest(nextState.offset));
      this.props.onChange({
        index: index,
        value: this.props.children[index].props.value
      });
    }
  }

  prev() {
    this.setState({
      current: this.state.current - 1,
      offset: this.calculateOptionOffset(this.getClosest(this.state.offset + this.calculateOptionHeight()))
    })
  }

  next() {
    this.setState({
      current: this.state.current + 1,
      offset: this.calculateOptionOffset(this.getClosest(this.state.offset - this.calculateOptionHeight()))
    })
  }

  dragStart(e) {
    if (e.touches && e.touches.length > 1) {
      return
    }
    let touches = e.touches
    if (!touches) {
        touches = [{ clientX: e.clientX, clientY: e.clientY }]
    }
    this.setState({
      drag: true,
      swipeStart: touches[0].clientY
    })
  }

  drag(e) {
    if (this.state.drag) {
      const delta = e.touches[0].clientY - this.state.swipeStart;
      this.setState({
        offset: this.normalizeOffset(this.state.offset + delta),
        swipeStart: e.touches[0].clientY
      });
    }
  }

  dragEnd() {
    this.setState({
      drag: false,
      swipeStart: null,
      current: this.getClosest(),
      offset: this.calculateOptionOffset(this.getClosest(this.state.offset))
    })
  }

  handleWheel(e) {
    let delta = Math.sign(e.deltaY)
    this.setState({
      current: this.state.current + delta,
      offset: this.calculateOptionOffset(
        this.getClosest(this.state.offset - delta * this.calculateOptionHeight())
      )
    })
  }

  calculateOptionHeight() {
    let { toShow } = this.props;
    let height = this.drum.offsetHeight;
    return (height / toShow);
  }

  calculateDefaultExtra() {
    return this.props.toShow
  }

  calculateDefaultOffset() {
    return - (this.props.toShow + 1) / 2 * this.calculateOptionHeight();
  }

  getClosest(offset) {
    return - Math.round((offset - this.calculateDefaultOffset()) / this.calculateOptionHeight())
  }

  normalizeOffset(nextOffset) {
    const height = this.calculateOptionHeight();

    if (nextOffset > 0) {
      return - (this.props.children.length * height) - this.state.offset + nextOffset
    } else if (nextOffset < - (this.props.children.length * height)) {
      return nextOffset - this.state.offset;
    } else {
      return nextOffset
    }
  }

  normalizeOptionIndex(value) {
    if (value < 0) {
      return this.props.children.length + value;
    } else if (value >= this.props.children.length){
      return value - this.props.children;
    } else {
      return Math.abs(value);
    }
  }

  calculateOptionOffset(optionIndex) {
    return this.normalizeOffset(
      - optionIndex * this.calculateOptionHeight() + this.calculateDefaultOffset()
    );
  }
  
  render() {
    let { children, componentClassName, drumClassName } = this.props;
    let { offset } = this.state;
    let initialized = this.drum !== undefined;
    let style, optionComponents;

    if (initialized) {
      let extra = this.calculateDefaultExtra();

      style = {
        transform: 'translate3d(0px, ' + (offset) + 'px, 0px)'
      }

      let options = [...children.slice(-extra), ...children];

      optionComponents = options.map((option, i) =>
        <div key={i} style={{height: this.calculateOptionHeight() + 'px'}}>{option}</div>
      );
    }

    return (
      <div className={componentClassName}>
        <div onClick={::this.next} className="arrow" >
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </div>
        <div
          className={drumClassName}
          ref={drum => {this.drum = drum}}
          onWheel={::this.handleWheel}
          onTouchStart={::this.dragStart}
          onTouchMove={::this.drag}
          onTouchEnd={::this.dragEnd}
          onMouseDown={::this.dragStart}
          onMouseMove={::this.drag}
          onMouseUp={::this.dragEnd}
        >
          {
            initialized
            &&
            <div className="drum-inner" style={style}>
              {optionComponents}
            </div>
          }
        </div>
        <div onClick={::this.prev} className="arrow" >
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}


Drum.propTypes = {
  children: React.PropTypes.array,
  onChange: React.PropTypes.func,
  toShow: React.PropTypes.number,
  drumClassName: React.PropTypes.string
};

Drum.defaultProps = {
  children: [],
  toShow: 5,
  onChange: () => {},
  componentClassName: 'drum-component',
  drumClassName: 'drum'
};


export default Drum;
