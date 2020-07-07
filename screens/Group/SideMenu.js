// @flow

import React from 'react';
import {
  PanResponder,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const absoluteStretch = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const styles = StyleSheet.create({
  container: {
    ...absoluteStretch,
    justifyContent: 'center',
  },
  menu: {
    ...absoluteStretch,
  },
  frontView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  overlay: {
    ...absoluteStretch,
    backgroundColor: 'transparent',
  },
});
type Props = {
  edgeHitWidth: number,
  toleranceX: number,
  toleranceY: number,
  menuPosition: 'left' | 'right',
  onChange: Function,
  onMove: Function,
  onSliding: Function,
  openMenuOffset: number,
  hiddenMenuOffset: number,
  disableGestures: Function | bool,
  animationFunction: Function,
  onStartShouldSetResponderCapture: Function,
  isOpen: bool,
  bounceBackOnOverdraw: bool,
  autoClosing: bool
};

type Event = {
  nativeEvent: {
    layout: {
      width: number,
      height: number,
    },
  },
};

type State = {
  width: number,
  height: number,
  openOffsetMenuPercentage: number,
  openMenuOffset: number,
  hiddenMenuOffsetPercentage: number,
  hiddenMenuOffset: number,
  left: Animated.Value,
};

const deviceScreen = Dimensions.get('window');
const barrierForward = deviceScreen.width / 4;

function shouldOpenMenu(dx) {
  return dx > barrierForward;
}

const SideMenu  = ({edgeHitWidth,
    toleranceX,
    toleranceY,
    menuPosition,
    onChange,
    onMove,
    onSliding,
    openMenuOffset,
    hiddenMenuOffset,
    disableGestures,
    animationFunction,
    onStartShouldSetResponderCapture,
    isOpen,
    bounceBackOnOverdraw,
    autoClosing,}) => {
   
    let prevLeft = 0;
    isOpen = !!isOpen;

    const initialMenuPositionMultiplier = menuPosition === 'right' ? -1 : 1;
    const openOffsetMenuPercentage = openMenuOffset / deviceScreen.width;
    const hiddenMenuOffsetPercentage = hiddenMenuOffset / deviceScreen.width;
    const left = new Animated.Value(
      isOpen
        ? openMenuOffset * initialMenuPositionMultiplier
        : hiddenMenuOffset,
    );
    const [state, setState] = useState({
        width: deviceScreen.width,
        height: deviceScreen.height,
        openOffsetMenuPercentage,
        openMenuOffset: deviceScreen.width * openOffsetMenuPercentage,
        hiddenMenuOffsetPercentage,
        hiddenMenuOffset: deviceScreen.width * hiddenMenuOffsetPercentage,
        left,
    })

    state.left.addListener(({value}) => onSliding(Math.abs((value - state.hiddenMenuOffset) / (openMenuOffset - state.hiddenMenuOffset))));
  

  componentWillMount(): void {
    this.responder = PanResponder.create({
      onStartShouldSetResponderCapture: this.onStartShouldSetResponderCapture,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
    });
  }

  UNSAFE_componentWillReceiveProps(props: Props): void {
    if (typeof props.isOpen !== 'undefined' && this.isOpen !== props.isOpen && (props.autoClosing || this.isOpen === false)) {
      this.openMenu(props.isOpen);
    }
  }

  onLayoutChange(e: Event) {
    const { width, height } = e.nativeEvent.layout;
    const openMenuOffset = width * this.state.openOffsetMenuPercentage;
    const hiddenMenuOffset = width * this.state.hiddenMenuOffsetPercentage;
    this.setState({ width, height, openMenuOffset, hiddenMenuOffset });
  }

  /**
   * Get content view. This view will be rendered over menu
   * @return {React.Component}
   */
  getContentView() {
    let overlay: React.Element<void, void> = null;

    if (this.isOpen) {
      overlay = (
        <TouchableWithoutFeedback onPress={() => this.openMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      );
    }

    const { width, height } = this.state;
    const ref = sideMenu => (this.sideMenu = sideMenu);
    const style = [
      styles.frontView,
      { width, height },
      this.props.animationStyle(this.state.left),
    ];

    return (
      <Animated.View style={style} ref={ref} {...this.responder.panHandlers}>
        {this.props.children}
        {overlay}
      </Animated.View>
    );
  }

  moveLeft(offset: number) {
    const newOffset = this.menuPositionMultiplier() * offset;

    this.props
      .animationFunction(this.state.left, newOffset)
      .start();

    this.prevLeft = newOffset;
  }

  menuPositionMultiplier(): -1 | 1 {
    return this.props.menuPosition === 'right' ? -1 : 1;
  }

  handlePanResponderMove(e: Object, gestureState: Object) {
    if (this.state.left.__getValue() * this.menuPositionMultiplier() >= 0) {
      let newLeft = this.prevLeft + gestureState.dx;

      if (!this.props.bounceBackOnOverdraw && Math.abs(newLeft) > this.state.openMenuOffset) {
        newLeft = this.menuPositionMultiplier() * this.state.openMenuOffset;
      }

      this.props.onMove(newLeft);
      this.state.left.setValue(newLeft);
    }
  }

  handlePanResponderEnd(e: Object, gestureState: Object) {
    const offsetLeft = this.menuPositionMultiplier() *
      (this.state.left.__getValue() + gestureState.dx);

    this.openMenu(shouldOpenMenu(offsetLeft));
  }

  handleMoveShouldSetPanResponder(e: any, gestureState: any): boolean {
    if (this.gesturesAreEnabled()) {
      const x = Math.round(Math.abs(gestureState.dx));
      const y = Math.round(Math.abs(gestureState.dy));

      const touchMoved = x > this.props.toleranceX && y < this.props.toleranceY;

      if (this.isOpen) {
        return touchMoved;
      }

      const withinEdgeHitWidth = this.props.menuPosition === 'right' ?
        gestureState.moveX > (deviceScreen.width - this.props.edgeHitWidth) :
        gestureState.moveX < this.props.edgeHitWidth;

      const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0;
      return withinEdgeHitWidth && touchMoved && swipingToOpen;
    }

    return false;
  }

  openMenu(isOpen: boolean): void {
    const { hiddenMenuOffset, openMenuOffset } = this.state;
    this.moveLeft(isOpen ? openMenuOffset : hiddenMenuOffset);
    this.isOpen = isOpen;

    this.forceUpdate();
    this.props.onChange(isOpen);
  }

  gesturesAreEnabled(): boolean {
    const { disableGestures } = this.props;

    if (typeof disableGestures === 'function') {
      return !disableGestures();
    }

    return !disableGestures;
  }

  render(): React.Element<void, void> {
    const boundryStyle = this.props.menuPosition === 'right' ?
      { left: this.state.width - this.state.openMenuOffset } :
      { right: this.state.width - this.state.openMenuOffset };

    const menu = (
      <View style={[styles.menu, boundryStyle]}>
        {this.props.menu}
      </View>
    );

    return (
      <View
        style={styles.container}
        onLayout={this.onLayoutChange}
      >
        {menu}
        {this.getContentView()}
      </View>
    );
  }
}

SideMenu.propTypes = {
  edgeHitWidth: PropTypes.number,
  toleranceX: PropTypes.number,
  toleranceY: PropTypes.number,
  menuPosition: PropTypes.oneOf(['left', 'right']),
  onChange: PropTypes.func,
  onMove: PropTypes.func,
  children: PropTypes.node,
  menu: PropTypes.node,
  openMenuOffset: PropTypes.number,
  hiddenMenuOffset: PropTypes.number,
  animationStyle: PropTypes.func,
  disableGestures: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  animationFunction: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  isOpen: PropTypes.bool,
  bounceBackOnOverdraw: PropTypes.bool,
  autoClosing: PropTypes.bool,
};

SideMenu.defaultProps = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  children: null,
  menu: null,
  openMenuOffset: deviceScreen.width * (2 / 3),
  disableGestures: false,
  menuPosition: 'left',
  hiddenMenuOffset: 0,
  onMove: () => {},
  onStartShouldSetResponderCapture: () => true,
  onChange: () => {},
  onSliding: () => {},
  animationStyle: value => ({
    transform: [{
      translateX: value,
    }],
  }),
  animationFunction: (prop, value) => Animated.spring(prop, {
    toValue: value,
    friction: 8,
  }),
  isOpen: false,
  bounceBackOnOverdraw: true,
  autoClosing: true,
};
