import React, { Component } from "react";
import {
  Container,
  Button,
  Input,
  Row,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export class Home extends Component {
  state = {
    array: [],
    barCount: 30,
    color: "burlywood",
    swaps: 0,
    comparisons: 0,
    speed: 250,
    dropdownOpen: false,
  };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  componentDidMount() {
    this.generateBars();
  }
  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  generateBars = () => {
    let barCount = this.state.barCount;
    let arr = [];

    for (let i = 0; i < barCount; i++) {
      arr.push(this.generateRandomNumber(50, 200));
    }

    this.setState({
      array: arr,
      comparisons: 0,
      swaps: 0,
    });
  };
  sortArray = () => {
    let array = [...this.state.array];
    let sortedArray = array.sort((a, b) => a - b);
    this.setState({ array: sortedArray });
  };
  bubbleSort = (array) => {
    const arr = this.state.array;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < arr.length; j++) {
        setTimeout(() => {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            this.setState({ swaps: this.state.swaps + 1 });
          }
          this.setState({ comparisons: this.state.comparisons + 1 }); // each comparison increment comparisons state by 1
        }, (n - i) * this.state.speed); // timeout is i * 10 millisecconds
      }
    }
  };

  selectionSort = () => {
    const inputArr = this.state.array;
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      let current = inputArr[i];
      // The last element of our sorted subarray
      let j = i - 1;
      while (j > -1 && current < inputArr[j]) {
        inputArr[j + 1] = inputArr[j];
        j--;
      }
      inputArr[j + 1] = current;
      this.setState({ array: inputArr });
    }
  };

  render() {
    return (
      <div>
        <Container className="text-center mt-3">
          <Container className="row">
            <p>
              Comparison: {this.state.comparisons}, Swaps:
              {this.state.swaps}
            </p>
            {this.state.array &&
              this.state.array.map((item, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{
                    height: `${item}px`,
                    background: `${this.state.color}`,
                  }}
                >
                  <p style={{ fontSize: "13px" }}>{item}</p>
                </div>
              ))}
          </Container>
          <Container>
            <div style={{ marginLeft: "200px", marginRight: "200px" }}>
              <Row>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                  className="mt-3 mb-3"
                >
                  <DropdownToggle caret>
                    Select sorting algorithm
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.bubbleSort()}>
                      Bubble sort
                    </DropdownItem>
                    <DropdownItem onClick={() => this.selectionSort()}>
                      Insertion sort
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <Button
                  className="btn-danger mb-3"
                  onClick={() => {
                    this.generateBars();
                  }}
                >
                  Reset Array
                </Button>

                <Label>Speed: {this.state.speed}</Label>
                <Input
                  type="range"
                  min={1}
                  max={500}
                  onChange={(e) => this.setState({ speed: e.target.value })}
                />
              </Row>
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Home;
