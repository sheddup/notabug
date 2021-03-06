import React from "react";
import { ThingCommentEntry as SnewThingCommentEntry } from "snew-classic-ui";
import { Link } from "./Link";
import { injectState } from "freactal";
import { notabugVotable } from "state/notabug";

export const ThingCommentEntry = notabugVotable(injectState(({
  ...props,
  state: { isVotingUp, isVotingDown },
  effects
}) => (
  <SnewThingCommentEntry
    {...props}
    Link={Link}
    likes={isVotingUp ? true : isVotingDown ? false : undefined}
    onShowReply={e => {
      e.preventDefault();
      effects.onNotabugSetReplyTo(props.id);
    }}
    isVoting={isVotingUp || isVotingDown}
    onVoteUp={effects.onVoteUp}
    onVoteDown={effects.onVoteDown}
  />
)));
