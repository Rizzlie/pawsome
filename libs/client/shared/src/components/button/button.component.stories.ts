import { toArgs, WithContent } from '@pawsome/storybook';
import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

type ButtonStoryComponent = WithContent<ButtonComponent>;

const meta: Meta<ButtonStoryComponent> = {
  component: ButtonComponent,
  title: 'Components/Button',
  args: toArgs<ButtonStoryComponent>({
    content: 'Button',
    outlined: false,
    disabled: false,
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent'],
    },
  },
  render: (args) => {
    const { content, ...props } = args;

    return {
      props,
      template: `<pawsome-button [variant]="'${props.variant}'" [outlined]="${props.outlined}">${content}</pawsome-button>`,
    };
  },
};

export default meta;

type Story = StoryObj<ButtonStoryComponent>;

export const Primary: Story = {
  args: toArgs<ButtonStoryComponent>({
    content: 'Primary',
    variant: 'primary',
  }),
};

export const Accent: Story = {
  args: toArgs<ButtonStoryComponent>({
    content: 'Accent',
    variant: 'accent',
  }),
};

export const Outlined: Story = {
  args: toArgs<ButtonStoryComponent>({
    content: 'Outlined',
    variant: 'primary',
    outlined: true,
  }),
};
