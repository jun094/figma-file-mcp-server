import type {
  FigmaNodeType,
  BaseFigmaNode,
  FigmaComponentNode,
  FigmaInstanceNode,
  FigmaNode,
  FigmaVariableScope,
  FigmaVariableResolvedType,
  FigmaColor,
  FigmaVariable,
  FigmaVariableCollection,
  ProcessedDesignSystemData
} from '../src/index';

describe('Shared Types', () => {
  describe('FigmaNodeType', () => {
    it('should include all required node types', () => {
      const nodeTypes: FigmaNodeType[] = [
        'DOCUMENT',
        'CANVAS', 
        'FRAME',
        'GROUP',
        'VECTOR',
        'COMPONENT',
        'COMPONENT_SET',
        'INSTANCE'
      ];

      nodeTypes.forEach(type => {
        expect(typeof type).toBe('string');
      });
    });
  });

  describe('BaseFigmaNode', () => {
    it('should have required properties', () => {
      const node: BaseFigmaNode = {
        id: '1:1',
        name: 'Test Node',
        type: 'FRAME'
      };

      expect(node.id).toBe('1:1');
      expect(node.name).toBe('Test Node');
      expect(node.type).toBe('FRAME');
    });

    it('should support optional children', () => {
      const parentNode: BaseFigmaNode = {
        id: '1:1',
        name: 'Parent',
        type: 'FRAME',
        children: [
          {
            id: '1:2',
            name: 'Child',
            type: 'COMPONENT'
          }
        ]
      };

      expect(parentNode.children).toHaveLength(1);
      expect(parentNode.children![0].id).toBe('1:2');
    });
  });

  describe('FigmaComponentNode', () => {
    it('should extend BaseFigmaNode for COMPONENT type', () => {
      const component: FigmaComponentNode = {
        id: '1:3',
        name: 'Button',
        type: 'COMPONENT',
        description: 'Primary button component'
      };

      expect(component.type).toBe('COMPONENT');
      expect(component.description).toBe('Primary button component');
    });

    it('should support COMPONENT_SET type', () => {
      const componentSet: FigmaComponentNode = {
        id: '1:4',
        name: 'Button Set',
        type: 'COMPONENT_SET',
        description: 'Button variations'
      };

      expect(componentSet.type).toBe('COMPONENT_SET');
    });
  });

  describe('FigmaInstanceNode', () => {
    it('should reference component ID', () => {
      const instance: FigmaInstanceNode = {
        id: '1:5',
        name: 'Button Instance',
        type: 'INSTANCE',
        componentId: '1:3'
      };

      expect(instance.type).toBe('INSTANCE');
      expect(instance.componentId).toBe('1:3');
    });
  });

  describe('FigmaVariable', () => {
    it('should have all required properties', () => {
      const variable: FigmaVariable = {
        id: 'var:1',
        name: 'colors/primary',
        key: 'color-primary',
        variableCollectionId: 'coll:1',
        resolvedType: 'COLOR',
        description: 'Primary brand color',
        hiddenFromPublishing: false,
        scopes: ['FILL_COLOR', 'STROKE_COLOR'],
        codeSyntax: {
          'WEB': 'var(--colors-primary)',
          'ANDROID': 'R.color.primary'
        },
        valuesByMode: {
          'light': { r: 0.2, g: 0.4, b: 1, a: 1 },
          'dark': { r: 0.3, g: 0.5, b: 1, a: 1 }
        }
      };

      expect(variable.id).toBe('var:1');
      expect(variable.resolvedType).toBe('COLOR');
      expect(variable.scopes).toContain('FILL_COLOR');
      expect(variable.valuesByMode.light).toEqual({ r: 0.2, g: 0.4, b: 1, a: 1 });
    });

    it('should support different variable types', () => {
      const colorVariable: FigmaVariable = {
        id: 'var:color',
        name: 'colors/primary',
        key: 'color-key',
        variableCollectionId: 'coll:1',
        resolvedType: 'COLOR',
        description: '',
        hiddenFromPublishing: false,
        scopes: ['FILL_COLOR'],
        codeSyntax: {},
        valuesByMode: {
          'default': { r: 1, g: 0, b: 0, a: 1 }
        }
      };

      const numberVariable: FigmaVariable = {
        id: 'var:number',
        name: 'spacing/base',
        key: 'spacing-key',
        variableCollectionId: 'coll:1',
        resolvedType: 'FLOAT',
        description: '',
        hiddenFromPublishing: false,
        scopes: ['GAP'],
        codeSyntax: {},
        valuesByMode: {
          'default': 8
        }
      };

      const stringVariable: FigmaVariable = {
        id: 'var:string',
        name: 'typography/family',
        key: 'font-key',
        variableCollectionId: 'coll:1',
        resolvedType: 'STRING',
        description: '',
        hiddenFromPublishing: false,
        scopes: ['TEXT_CONTENT'],
        codeSyntax: {},
        valuesByMode: {
          'default': 'Inter'
        }
      };

      const booleanVariable: FigmaVariable = {
        id: 'var:boolean',
        name: 'features/darkMode',
        key: 'dark-mode-key',
        variableCollectionId: 'coll:1',
        resolvedType: 'BOOLEAN',
        description: '',
        hiddenFromPublishing: false,
        scopes: [],
        codeSyntax: {},
        valuesByMode: {
          'default': true
        }
      };

      expect(colorVariable.resolvedType).toBe('COLOR');
      expect(numberVariable.resolvedType).toBe('FLOAT');
      expect(stringVariable.resolvedType).toBe('STRING');
      expect(booleanVariable.resolvedType).toBe('BOOLEAN');
    });
  });

  describe('FigmaVariableCollection', () => {
    it('should have all required properties', () => {
      const collection: FigmaVariableCollection = {
        id: 'coll:1',
        name: 'Design Tokens',
        modes: [
          { modeId: 'mode:1', name: 'Light' },
          { modeId: 'mode:2', name: 'Dark' }
        ],
        defaultModeId: 'mode:1',
        variableIds: ['var:1', 'var:2']
      };

      expect(collection.id).toBe('coll:1');
      expect(collection.modes).toHaveLength(2);
      expect(collection.defaultModeId).toBe('mode:1');
      expect(collection.variableIds).toContain('var:1');
    });
  });

  describe('ProcessedDesignSystemData', () => {
    it('should have correct structure', () => {
      const data: ProcessedDesignSystemData = {
        fileName: 'Test Design System',
        lastModified: '2024-12-30T00:00:00.000Z',
        components: {
          '1:1': {
            id: '1:1',
            name: 'Button',
            type: 'COMPONENT',
            description: 'Primary button'
          }
        },
        variables: {
          'var:1': {
            id: 'var:1',
            name: 'colors/primary',
            resolvedType: 'COLOR',
            valuesByMode: {
              'light': { r: 0, g: 0, b: 1, a: 1 }
            },
            scopes: ['FILL_COLOR'],
            description: 'Primary color',
            codeSyntax: {}
          }
        },
        variableCollections: {
          'coll:1': {
            id: 'coll:1',
            name: 'Colors',
            modes: [{ modeId: 'mode:1', name: 'Light' }],
            defaultModeId: 'mode:1'
          }
        }
      };

      expect(data.fileName).toBe('Test Design System');
      expect(data.components['1:1'].name).toBe('Button');
      expect(data.variables!['var:1'].resolvedType).toBe('COLOR');
      expect(data.variableCollections!['coll:1'].name).toBe('Colors');
    });

    it('should support optional variables and collections', () => {
      const minimalData: ProcessedDesignSystemData = {
        fileName: 'Minimal System',
        lastModified: '2024-12-30T00:00:00.000Z',
        components: {}
      };

      expect(minimalData.variables).toBeUndefined();
      expect(minimalData.variableCollections).toBeUndefined();
      expect(minimalData.components).toEqual({});
    });
  });

  describe('Type Guards and Utilities', () => {
    it('should identify component nodes correctly', () => {
      const component: FigmaNode = {
        id: '1:1',
        name: 'Button',
        type: 'COMPONENT'
      };

      const frame: FigmaNode = {
        id: '1:2',
        name: 'Frame',
        type: 'FRAME'
      };

      // 타입 가드 함수 (실제 구현에서 사용)
      const isComponent = (node: FigmaNode): node is FigmaComponentNode => {
        return node.type === 'COMPONENT' || node.type === 'COMPONENT_SET';
      };

      expect(isComponent(component)).toBe(true);
      expect(isComponent(frame)).toBe(false);
    });

    it('should validate Figma ID format', () => {
      const validIds = ['1:1', '123:456', '0:1'];
      const invalidIds = ['1', '1:', ':1', 'abc:def', '1:1:1'];

      const isValidFigmaId = (id: string): boolean => {
        return /^\d+:\d+$/.test(id);
      };

      validIds.forEach(id => {
        expect(isValidFigmaId(id)).toBe(true);
      });

      invalidIds.forEach(id => {
        expect(isValidFigmaId(id)).toBe(false);
      });
    });
  });

  describe('Color Type Validation', () => {
    it('should validate FigmaColor values', () => {
      const validColor: FigmaColor = { r: 0.5, g: 0.5, b: 0.5, a: 1 };
      const invalidColorRange: FigmaColor = { r: 2, g: -1, b: 0.5, a: 1.5 };

      const isValidColorRange = (color: FigmaColor): boolean => {
        return color.r >= 0 && color.r <= 1 &&
               color.g >= 0 && color.g <= 1 &&
               color.b >= 0 && color.b <= 1 &&
               color.a >= 0 && color.a <= 1;
      };

      expect(isValidColorRange(validColor)).toBe(true);
      expect(isValidColorRange(invalidColorRange)).toBe(false);
    });

    it('should convert color to hex string', () => {
      const color: FigmaColor = { r: 1, g: 0, b: 0, a: 1 };
      
      const toHex = (color: FigmaColor): string => {
        const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
        const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
        const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
      };

      expect(toHex(color)).toBe('#ff0000');
    });
  });

  describe('Variable Scope Validation', () => {
    it('should validate variable scopes', () => {
      const validScopes: FigmaVariableScope[] = [
        'ALL_SCOPES',
        'FILL_COLOR',
        'STROKE_COLOR',
        'TEXT_CONTENT',
        'CORNER_RADIUS',
        'WIDTH_HEIGHT',
        'GAP'
      ];

      const isValidScope = (scope: string): scope is FigmaVariableScope => {
        return validScopes.includes(scope as FigmaVariableScope);
      };

      expect(isValidScope('FILL_COLOR')).toBe(true);
      expect(isValidScope('INVALID_SCOPE')).toBe(false);
    });

    it('should group scopes by category', () => {
      const colorScopes: FigmaVariableScope[] = ['FILL_COLOR', 'STROKE_COLOR', 'TEXT_FILL_COLOR'];
      const sizingScopes: FigmaVariableScope[] = ['WIDTH_HEIGHT', 'CORNER_RADIUS', 'GAP'];
      const textScopes: FigmaVariableScope[] = ['TEXT_CONTENT'];

      expect(colorScopes.every(scope => scope.includes('COLOR'))).toBe(true);
      expect(sizingScopes.every(scope => ['WIDTH_HEIGHT', 'CORNER_RADIUS', 'GAP'].includes(scope))).toBe(true);
      expect(textScopes.every(scope => scope.includes('TEXT'))).toBe(true);
    });
  });
});
