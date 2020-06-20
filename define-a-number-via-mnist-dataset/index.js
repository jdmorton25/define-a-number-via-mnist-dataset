const print = function(message) {
    console.log(message);
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes, learning_rate) {
        this.inodes = input_nodes;
        this.hnodes = hidden_nodes;
        this.onodes = output_nodes;
        this.lr = learning_rate;
        this.Wih = Wih;
        // math.random([this.hnodes, this.inodes], -0.5, 0.5);
        this.Who = Who;
        // math.random([this.onodes, this.hnodes], -0.5, 0.5);
        this.activation_function = function(x) {
            var result = math.clone(x);
            if( Array.isArray(x) ) {
                for(var i = 0; i < x.length; i++)
                    for(var j = 0; j < x[0].length; j++)
                        result[i][j] = 1 / ( 1 + math.e ** (-x[i][j]) );
                return result;
            } else if( Number.isFinite(x) ) {
                return 1 / ( 1 + math.e ** (-x) );
            }
        }
    }

    train(inputs_list, targets_list) {

        const inputs = math.transpose([inputs_list]);
        const targets = math.transpose([targets_list]);

        const hidden_inputs = math.multiply(this.Wih, inputs);
        const hidden_outputs = this.activation_function(hidden_inputs);

        const final_inputs = math.multiply(this.Who, hidden_outputs);
        const final_outputs = this.activation_function(final_inputs);

        const output_errors = math.subtract(targets, final_outputs);
        const hidden_errors = math.multiply(math.transpose(this.Who), output_errors);
        /*
        self.who += self.lr * numpy.dot((output_errors* final_outputs *
                            (1.0 ­ final_outputs)), numpy.transpose(hidden_outputs))
        */
        this.Who = math.add(this.Who, math.multiply(this.lr, math.multiply(math.dotMultiply(math.dotMultiply(output_errors, final_outputs), 
        math.subtract(1.0, final_outputs)), math.transpose(hidden_outputs))));
        this.Wih = math.add(this.Wih, math.multiply(this.lr, math.multiply(math.dotMultiply(math.dotMultiply(hidden_errors, hidden_outputs), 
        math.subtract(1.0, hidden_outputs)), math.transpose(inputs))));
        
    }

    query(inputs_list) {
        const inputs = math.transpose([inputs_list]);

        const hidden_inputs = math.multiply(this.Wih, inputs);
        const hidden_outputs = this.activation_function(hidden_inputs);

        const final_inputs = math.multiply(this.Who, hidden_outputs);
        const final_outputs = this.activation_function(final_inputs);

        return final_outputs;
    }
}

const handleArray = function(array) {
    for(var i = 0; i < array.length; i++) {
        // array[i].input[j] = array[i].input[j] * 0.99 + 0.01;
        array[i].input = math.add(math.multiply(array[i].input, 0.99), 0.01)
        array[i].output = math.add(math.multiply(array[i].output, 0.99), 0.01)
        
    }
}

const handleArrayForData = function(array) {
    var new_array = []
    for(var i = 3; i < array.length; i += 4) {
        new_array.push( array[i] / 255 * 0.99 + 0.01 );
    }
    return new_array;
}

/*

var set = mnist.set(6000, 1500);
var training_set = set.training;
var test_set = set.test;

handleArray(training_set);
handleArray(test_set);

const epochs = 4;

*/

const input_nodes = 784;
const hidden_nodes = 200;
const output_nodes = 10;
const learning_rate = 0.2;



const n = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate);
console.log(n);

/*

print("Training has been begun...");
for(var e = 0; e < epochs; e++) {
    

    print( "Epoch " + (e + 1) );
    for(var i = 0; i < training_set.length; i++) {
        n.train(training_set[i].input, training_set[i].output);
        print((i + 1) + " / " + training_set.length);
    }
    print("Training has been ended.");

    print("Testing has been begun...");
    var counter = 0;
    for(var i = 0; i < test_set.length; i++) {
        if(indexOfMax(test_set[i].output) === indexOfMax(n.query(test_set[i].input)))
            counter++;
    }
    print("Testing has been ended.")
    print(counter + " / " + test_set.length + " or " + (counter/test_set.length*100).toFixed(2) + "%");
}

*/