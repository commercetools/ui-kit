const figmaComonentsUrl =
  'https://api.figma.com/v1/files/<your-file-key-here>/components';
const figmaToken = 'your-figma-token-here';

/**
 * Fetches the figma component ids from the figma api
 * @returns {Map<string, {name: string, nodeId: string}>} - A map of component names to their corresponding node ids
 * @throws {Error} - If the fetch request fails
 * @example
 * const componentIds = await fetchFigmaComponentIds();
 * console.log(componentIds.get('button'));
 * // Output: { name: 'button', nodeId: '0:1' }
 **/

async function fetchFigmaComponentIds() {
  try {
    const response = await fetch(figmaComonentsUrl, {
      method: 'GET',
      headers: {
        'X-FIGMA-TOKEN': figmaToken,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const componentListArray = data.meta.components
      // Filter out components that do not have a `containingStateGroup` property
      // as it contains the correct nodeId for the component
      .filter((component) =>
        component.containing_frame.hasOwnProperty('containingStateGroup')
      )
      // create a new array with a normalized name of the component
      // and the encoded node id of the component
      .map((component) => {
        return {
          name: component.containing_frame.containingStateGroup.name
            .split('/')
            .pop()
            .toLowerCase()
            .replace(/[\s\-]/g, ''),
          nodeId: encodeURIComponent(
            component.containing_frame.containingStateGroup.nodeId
          ),
        };
      });
    // Use a Map arranged by name for lookups TODO: needs to be deduped
    return new Map(
      componentListArray.map((component) => [component.name, component])
    );
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

module.exports = { fetchFigmaComponentIds };
