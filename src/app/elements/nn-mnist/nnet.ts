import { NDArray, Array2D, Array1D, Scalar, ENV } from 'deeplearn';

export class NNetUtil {
  static createModelFromSnapshot(vars: { [varName: string]: NDArray }) {
    return {
      hidden1W: vars['hidden1/weights'] as Array2D,
      hidden1B: vars['hidden1/biases'] as Array1D,
      hidden2W: vars['hidden2/weights'] as Array2D,
      hidden2B: vars['hidden2/biases'] as Array1D,
      softmaxW: vars['softmax_linear/weights'] as Array2D,
      softmaxB: vars['softmax_linear/biases'] as Array1D
    };
  }

  /**
   * Infers through a 3-layer fully connected MNIST model using the Math API. This
   * is the lowest level user-facing API in deeplearn.js giving the most control
   * to the user. Math commands execute immediately, like numpy.
   */
  static predict(
    value: Array1D,
    model: { [key: string]: Array1D | Array2D }
  ): Scalar<'int32'> {
    const math = ENV.math;
    const hidden1 = math.relu(
      math.add(
        math.vectorTimesMatrix(value, <Array2D>model.hidden1W),
        model.hidden1B
      )
    ) as Array1D;
    const hidden2 = math.relu(
      math.add(
        math.vectorTimesMatrix(hidden1, <Array2D>model.hidden2W),
        model.hidden2B
      )
    ) as Array1D;

    const logits = math.add(
      math.vectorTimesMatrix(hidden2, <Array2D>model.softmaxW),
      model.softmaxB
    );

    return math.argMax(logits);
  }
}
