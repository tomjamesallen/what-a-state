import { InferSubstrings } from './InferSubstrings';

export const compare = <TTuple extends [string, ...string[]]>(
  allStates: TTuple
) => {
  type StateOptions = TTuple[number];
  type AllComparisonOptions = InferSubstrings<StateOptions>;

  return (activeState: StateOptions) => {
    return {
      allStates,
      activeState,
      matches: (comparisonState: AllComparisonOptions) => {
        return activeState.startsWith(comparisonState);
      },
      gte: (comparisonState: AllComparisonOptions) => {
        const indexOfActiveState = allStates.indexOf(activeState);
        const firstMatchingIndex = allStates.findIndex((state) =>
          state.startsWith(comparisonState)
        );
        return indexOfActiveState >= firstMatchingIndex;
      },
      lte: (comparisonState: AllComparisonOptions) => {
        const indexOfActiveState = allStates.indexOf(activeState);
        const lastMatchingIndex = allStates.findLastIndex((state) =>
          state.startsWith(comparisonState)
        );
        return indexOfActiveState <= lastMatchingIndex;
      },
      gt: (comparisonState: AllComparisonOptions) => {
        const indexOfActiveState = allStates.indexOf(activeState);
        const firstMatchingIndex = allStates.findLastIndex((state) =>
          state.startsWith(comparisonState)
        );
        return indexOfActiveState > firstMatchingIndex;
      },
      lt: (comparisonState: AllComparisonOptions) => {
        const indexOfActiveState = allStates.indexOf(activeState);
        const lastMatchingIndex = allStates.findIndex((state) =>
          state.startsWith(comparisonState)
        );
        return indexOfActiveState < lastMatchingIndex;
      },
    };
  };
};
