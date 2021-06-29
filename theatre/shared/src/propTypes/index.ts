import type {$IntentionalAny} from '@theatre/shared/utils/types'

const s = Symbol('TheatrePropType_Basic')
type S = typeof s

interface IBasePropType<ValueType> {
  valueType: ValueType
  [s]: 'TheatrePropType'
}

export interface PropTypeConfig_Number extends IBasePropType<number> {
  type: 'number'
  default: number
  min?: number
  max?: number
  step?: number
}

export const number = (
  defaultValue: number,
  opts?: Pick<PropTypeConfig_Number, 'min' | 'max' | 'step'>,
): PropTypeConfig_Number => {
  return {
    type: 'number',
    valueType: 0,
    default: defaultValue,
    [s]: 'TheatrePropType',
    ...(opts ? opts : {}),
  }
}

export interface PropTypeConfig_Boolean extends IBasePropType<boolean> {
  type: 'boolean'
  default: boolean
}

export const boolean = (defaultValue: boolean): PropTypeConfig_Boolean => {
  return {
    type: 'boolean',
    default: defaultValue,
    valueType: null as $IntentionalAny,
    [s]: 'TheatrePropType',
  }
}

export interface PropTypeConfig_String extends IBasePropType<string> {
  type: 'string'
  default: string
}

export const string = (defaultValue: string): PropTypeConfig_String => {
  return {
    type: 'string',
    default: defaultValue,
    valueType: null as $IntentionalAny,
    [s]: 'TheatrePropType',
  }
}

type IValidSheetountProps = {
  [K in string]: PropTypeConfig
}

/**
 * @todo Determine if 'compound' is a clear term for what this is.
 * I didn't want to use 'object' as it could get confused with
 * SheetObject.
 */
export interface PropTypeConfig_Compound<Props extends IValidSheetountProps>
  extends IBasePropType<{[K in keyof Props]: Props[K]['valueType']}> {
  type: 'compound'
  props: Record<string, PropTypeConfig>
}

export const compound = <Props extends IValidSheetountProps>(
  props: Props,
): PropTypeConfig_Compound<Props> => {
  return {
    type: 'compound',
    props,
    valueType: null as $IntentionalAny,
    [s]: 'TheatrePropType',
  }
}

export interface PropTypeConfig_Enum extends IBasePropType<{}> {
  type: 'enum'
  cases: Record<string, PropTypeConfig>
  defaultCase: string
}

export type PropTypeConfig_AllPrimitives =
  | PropTypeConfig_Number
  | PropTypeConfig_Boolean
  | PropTypeConfig_String

export type PropTypeConfig =
  | PropTypeConfig_AllPrimitives
  | PropTypeConfig_Compound<$IntentionalAny>
  | PropTypeConfig_Enum