import always from "ramda/es/always";
import identity from "ramda/es/identity";
import uuid from "uuid";
import { provideState, update } from "freactal";
import { COMMENT_BODY_MAX } from "notabug-peer";

const initialState = () => ({
  commentBody: "",
  formId: uuid.v4()
});

const getCommentFormState = always(identity);

const onChangeCommentBody = update((state, commentBody) => ({ commentBody }));

const onResetCommentForm = update(() => ({ commentBody: "", formId: uuid.v4() }));

const onSaveComment = (effects) => effects.getCommentFormState()
  .then((state) => {
    if (isCommentTooLong(state) || isCommentTooShort(state)) return;
    return effects.onNotabugSaveComment(state.commentBody)
      .then(() => effects.onResetCommentForm());
  })
  .then(getCommentFormState);

const isCommentTooLong = ({ commentBody }) => commentBody.length > COMMENT_BODY_MAX;
const isCommentTooShort = ({ commentBody }) => !commentBody.trim();

export const notabugCommentForm = provideState({
  initialState,
  effects: {
    getCommentFormState,
    onChangeCommentBody,
    onSaveComment,
    onResetCommentForm
  },
  computed: { isCommentTooLong }
});
