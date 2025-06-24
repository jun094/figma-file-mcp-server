// Figma API 응답 모킹을 위한 헬퍼 함수들

export const createMockFigmaFile = () => ({
  name: "Test Design System",
  lastModified: "2024-12-30T00:00:00.000Z",
  thumbnailUrl: "https://s3-alpha.figma.com/thumbnail.png",
  version: "1.0.0",
  role: "owner",
  editorType: "figma",
  linkAccess: "view",
  document: {
    id: "0:0",
    name: "Document",
    type: "DOCUMENT",
    children: [
      {
        id: "1:2",
        name: "Design System",
        type: "CANVAS",
        backgroundColor: { r: 0.98, g: 0.98, b: 0.98, a: 1 },
        children: [
          createMockComponent("1:3", "Button", "COMPONENT"),
          createMockComponentSet("1:4", "Button Set", "COMPONENT_SET"),
          createMockFrame("1:5", "Components", "FRAME")
        ]
      }
    ]
  },
  components: {
    "1:3": {
      key: "component-key-1",
      name: "Button",
      description: "Primary button component"
    }
  },
  componentSets: {
    "1:4": {
      key: "component-set-key-1",
      name: "Button Set",
      description: "Button component variations"
    }
  },
  schemaVersion: 0,
  styles: {},
  mainFileKey: "test-file-key",
  branches: []
});

export const createMockComponent = (id: string, name: string, type: "COMPONENT") => ({
  id,
  name,
  type,
  blendMode: "PASS_THROUGH",
  children: [],
  constraints: {
    vertical: "TOP",
    horizontal: "LEFT"
  },
  layoutAlign: "INHERIT",
  layoutGrow: 0,
  layoutSizingHorizontal: "FIXED",
  layoutSizingVertical: "FIXED",
  clipsContent: false,
  background: [],
  fills: [],
  strokes: [],
  strokeWeight: 0,
  strokeAlign: "INSIDE",
  backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
  exportSettings: [],
  effects: [],
  cornerRadius: 8,
  rectangleCornerRadii: [8, 8, 8, 8],
  description: `${name} component description`
});

export const createMockComponentSet = (id: string, name: string, type: "COMPONENT_SET") => ({
  id,
  name,
  type,
  children: [
    createMockComponent(`${id}_1`, `${name}/Default`, "COMPONENT"),
    createMockComponent(`${id}_2`, `${name}/Hover`, "COMPONENT"),
    createMockComponent(`${id}_3`, `${name}/Disabled`, "COMPONENT")
  ],
  description: `${name} component set with variations`
});

export const createMockFrame = (id: string, name: string, type: "FRAME") => ({
  id,
  name,
  type,
  children: [],
  backgroundColor: { r: 0.95, g: 0.95, b: 0.95, a: 1 },
  layoutMode: "VERTICAL",
  layoutWrap: "NO_WRAP",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 16,
  itemSpacing: 8
});

export const createMockVariables = () => ({
  meta: {
    variables: {
      "var:1": {
        id: "var:1",
        name: "colors/primary",
        key: "color-primary-key",
        variableCollectionId: "coll:1",
        resolvedType: "COLOR",
        description: "Primary brand color",
        hiddenFromPublishing: false,
        scopes: ["FILL_COLOR", "STROKE_COLOR"],
        codeSyntax: {
          "WEB": "var(--colors-primary)",
          "ANDROID": "R.color.primary",
          "IOS": "Color.primary"
        },
        valuesByMode: {
          "mode:1": {
            r: 0.2,
            g: 0.4,
            b: 1,
            a: 1
          }
        }
      },
      "var:2": {
        id: "var:2",
        name: "spacing/base",
        key: "spacing-base-key",
        variableCollectionId: "coll:1",
        resolvedType: "FLOAT",
        description: "Base spacing unit",
        hiddenFromPublishing: false,
        scopes: ["GAP", "WIDTH_HEIGHT"],
        codeSyntax: {
          "WEB": "var(--spacing-base)",
          "ANDROID": "R.dimen.spacing_base",
          "IOS": "Spacing.base"
        },
        valuesByMode: {
          "mode:1": 8
        }
      }
    },
    collections: {
      "coll:1": {
        id: "coll:1",
        name: "Design Tokens",
        modes: [
          {
            modeId: "mode:1",
            name: "Light"
          },
          {
            modeId: "mode:2", 
            name: "Dark"
          }
        ],
        defaultModeId: "mode:1",
        remote: false,
        hiddenFromPublishing: false,
        variableIds: ["var:1", "var:2"]
      }
    }
  },
  error: false
});

export const createMockProcessedData = () => ({
  fileName: "Test Design System",
  lastModified: "2024-12-30T00:00:00.000Z",
  components: {
    "1:3": {
      id: "1:3",
      name: "Button",
      type: "COMPONENT",
      description: "Primary button component"
    },
    "1:4_1": {
      id: "1:4_1", 
      name: "Button Set/Default",
      type: "COMPONENT",
      description: "Button Set/Default component description"
    }
  },
  variables: {
    "var:1": {
      id: "var:1",
      name: "colors/primary",
      resolvedType: "COLOR",
      description: "Primary brand color",
      scopes: ["FILL_COLOR", "STROKE_COLOR"],
      codeSyntax: {
        "WEB": "var(--colors-primary)",
        "ANDROID": "R.color.primary",
        "IOS": "Color.primary"
      },
      valuesByMode: {
        "mode:1": { r: 0.2, g: 0.4, b: 1, a: 1 }
      }
    }
  },
  variableCollections: {
    "coll:1": {
      id: "coll:1",
      name: "Design Tokens",
      modes: [
        { modeId: "mode:1", name: "Light" },
        { modeId: "mode:2", name: "Dark" }
      ],
      defaultModeId: "mode:1"
    }
  }
});

// API 에러 모킹
export const createMockApiError = (status: number, message: string) => ({
  response: {
    status,
    data: {
      error: true,
      status,
      err: message
    }
  },
  message,
  isAxiosError: true
});

// HTTP 요청 모킹 헬퍼
export const mockAxiosGet = (mockData: any) => {
  const axios = require('axios');
  return jest.spyOn(axios, 'get').mockResolvedValue({
    data: mockData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  });
};

export const mockAxiosGetError = (error: any) => {
  const axios = require('axios');
  return jest.spyOn(axios, 'get').mockRejectedValue(error);
};

// 파일 시스템 모킹 헬퍼
export const mockFileSystem = () => {
  const fs = require('fs/promises');
  
  const mockReadFile = jest.spyOn(fs, 'readFile');
  const mockWriteFile = jest.spyOn(fs, 'writeFile');
  const mockMkdir = jest.spyOn(fs, 'mkdir');
  
  return {
    mockReadFile,
    mockWriteFile,
    mockMkdir,
    reset: () => {
      mockReadFile.mockReset();
      mockWriteFile.mockReset();
      mockMkdir.mockReset();
    }
  };
};

// YAML 검증 헬퍼
export const validateYamlStructure = (yamlContent: string) => {
  const yaml = require('js-yaml');
  try {
    const parsed = yaml.load(yamlContent);
    return {
      isValid: true,
      data: parsed,
      error: null
    };
  } catch (error) {
    return {
      isValid: false,
      data: null,
      error: error.message
    };
  }
};

// 성능 테스트 헬퍼
export const measurePerformance = async (fn: () => Promise<any>) => {
  const startTime = process.hrtime.bigint();
  const startMemory = process.memoryUsage();
  
  const result = await fn();
  
  const endTime = process.hrtime.bigint();
  const endMemory = process.memoryUsage();
  
  return {
    result,
    executionTime: Number(endTime - startTime) / 1_000_000, // ms
    memoryDelta: {
      rss: endMemory.rss - startMemory.rss,
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal
    }
  };
};

// 테스트 데이터 정리 헬퍼
export const cleanupTestData = async (paths: string[]) => {
  const fs = require('fs/promises');
  const path = require('path');
  
  for (const filePath of paths) {
    try {
      await fs.unlink(path.resolve(filePath));
    } catch (error) {
      // 파일이 없어도 무시
      if (error.code !== 'ENOENT') {
        console.warn(`Failed to cleanup ${filePath}:`, error.message);
      }
    }
  }
};
